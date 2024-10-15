import { Img } from "@/app/[lang]/gallery/page";
import { urlFor } from "@/sanity/lib/image";
import { min } from "lodash";
import Image from "next/image";

interface ImgExt extends Img {
  transHeight: number;
  transWidth: number;
}

export default function Mas(props: { images: Img[] }) {
  // const { length } = images;
  const sm: ImgExt[] = [];
  const md: ImgExt[] = [];
  const lg: ImgExt[] = [];
  const sorted: ImgExt[] = [];
  const widths = props.images.map((i) => i.width);
  // const heights = images.map((i) => i.height);
  // const maxWidth = Math.max(...widths);
  // const minHeight = Math.min(...heights);
  const minWidth = Math.min(...widths);
  const mdThreshold = minWidth * 2;
  const lgThreshold = minWidth * 3;

  const containerWidth = 1280;
  const columnWidth = 320;
  const rowHeight = 32;
  const containerHeight = containerWidth / rowHeight;

  const heights = [0, 0, 0];

  const getTransHeight = (h: number, w: number) =>
    Math.round(
      (h * ((w > lgThreshold ? 3 : w > mdThreshold ? 2 : 1) * columnWidth)) /
        w /
        rowHeight,
    );
  const getTransWidth = (w: number) =>
    Math.round(w > lgThreshold ? 3 : w > mdThreshold ? 2 : 1);

  const extImages: ImgExt[] = props.images.map((i) => ({
    ...i,
    transHeight: getTransHeight(i.height, i.width),
    transWidth: getTransWidth(i.width),
  }));

  extImages.forEach((img) =>
    img.width >= lgThreshold
      ? lg.push(img)
      : img.width >= mdThreshold
        ? md.push(img)
        : sm.push(img),
  );
  const minLength = Math.min(
    ...[sm.length, md.length, lg.length].filter((l) => l !== 0),
  );
  const lgQ = Math.round(lg.length / minLength);
  const mdQ = Math.round(md.length / minLength);
  const smQ = Math.round(sm.length / minLength);

  const addQueue = () => {
    if (smQ + mdQ + lgQ === 0) return;
    const rest = [smQ, mdQ, lgQ];
    let iMax = rest.findIndex((v) => v === Math.max(...rest));
    sorted.push(
      iMax === 0 && sm.length
        ? sm.shift()!
        : iMax === 1 && md.length
          ? md.shift()!
          : lg.shift()!,
    );
    rest[iMax]--;
    heights[iMax] += sorted.at(-1)?.transHeight ?? 0;
    if (rest[0] === 1 && sm.length) {
      sorted.push(sm.shift()!);
      rest[0]--;
      heights[0] += sorted.at(-1)?.transHeight ?? 0;
    } else if (rest[1] === 1 && md.length) {
      sorted.push(md.shift()!);
      rest[1]--;
      heights[1] += sorted.at(-1)?.transHeight ?? 0;
    } else if (rest[2] === 1 && lg.length) {
      sorted.push(lg.shift()!);
      rest[2]--;
      heights[2] += sorted.at(-1)?.transHeight ?? 0;
    }
    let start = rest.reduce((a, v) => a + v);
    if (start === 1) {
      sorted.push(rest[0] ? sm.shift()! : rest[1] ? md.shift()! : lg.shift()!);
      heights[rest[0] ? 0 : rest[1] ? 1 : 2] += sorted.at(-1)?.transHeight ?? 0;
      return;
    }
    iMax = rest.findIndex((v) => v === Math.max(...rest));
    const iMin = rest.findIndex(
      (v) => v === Math.min(...rest.filter((v) => v !== 0)),
    );
    const quantifier = Math.round(rest[iMax] / rest[iMin]);
    while (start > 0) {
      if (rest[iMax] > rest[iMin] * (quantifier - 1)) {
        sorted.push(
          iMax === 0 ? sm.shift()! : iMax === 1 ? md.shift()! : lg.shift()!,
        );
        rest[iMax]--;
        heights[iMax] += sorted.at(-1)?.transHeight ?? 0;
      } else {
        sorted.push(
          iMin === 0 ? sm.shift()! : iMin === 1 ? md.shift()! : lg.shift()!,
        );
        rest[iMin]--;
        heights[iMin] += sorted.at(-1)?.transHeight ?? 0;
      }
      start--;
    }
  };

  while (sm.length + md.length + lg.length) {
    // getBlock();
    addQueue();
  }

  return (
    <div
      className={`grid grid-cols-4 grid-rows-[repeat(${Math.max(...heights)},_32px)]`}
    >
      {sorted.map((i) => (
        <div
          key={i.lqip}
          className={`col-span-${i.transWidth} row-span-${i.transHeight} relative`}
        >
          <Image src={urlFor(i.image).url()} alt="" fill></Image>
        </div>
      ))}
    </div>
  );
  // getBlock()
  // console.log(sm,md,lg)
  // }
  // console.log(sorted)
  // return (
  //   <div>
  //     {[images.splice(0,1)]}
  //     {images.map(i => (<Image src={urlFor(i.image).url()} alt="" key={i.lqip} >

  //     </Image>))}
  //   </div>
  // )
}

// function getBlock() {
//   let q = 16;
//   let currentColumn = 0;
//   const big = lg.shift() || md.shift() || sm.shift()!;
//   const columnHeights = [0, 0, 0, 0];
//   const bigCellWidth = Math.min(Math.floor(big.width / minWidth), 3);
//   const bigCellHeight = Math.min(Math.round(big.transHeight / minWidth), 3);
//   q -= bigCellHeight * bigCellWidth;
//   let [fit] = sm.splice(
//     (sm.findIndex(
//       (i) =>
//         Math.abs(big.transHeight / 2 - i.transHeight) / i.transHeight < 0.2,
//     ) + 1 ||
//       sm.findIndex(
//         (i) =>
//           big.transHeight / i.transHeight < 0.1 &&
//           big.transHeight > i.transHeight,
//       ) + 1) - 1,
//     1,
//   );
//   if (fit && Math.random() > 0.5) {
//     sorted.push(fit, big);

//     for (let i = 1; i <= bigCellWidth; i++) {
//       columnHeights[i] = big.transHeight;
//       currentColumn++;
//     }

//     columnHeights[currentColumn++] = fit.transHeight;
//     currentColumn++;
//     q -= Math.round(fit.transHeight / minWidth);
//   } else if (fit) {
//     sorted.push(big, fit);
//     for (let i = 0; i < bigCellWidth; i++) {
//       columnHeights[i] = big.transHeight;
//       currentColumn++;
//     }
//     columnHeights[bigCellWidth] = fit.transHeight;
//     currentColumn++;
//     q -= Math.round(fit.transHeight / minWidth);
//   } else {
//     sorted.push(big);
//     for (let i = 0; i < bigCellWidth; i++) {
//       columnHeights[i] = big.transHeight;
//       currentColumn++;
//     }
//     if (bigCellWidth === 3) {
//       const next = sm.shift() || md.shift();
//       if (next) {
//         sorted.push(next);
//         currentColumn++;
//         q -= Math.round(next.transHeight / minWidth);
//         columnHeights[3] = next.transHeight;
//       }
//     }
//   }
//   const restSize = 4 * minWidth - columnHeights[1];
//   let fitMid: ImgExt | null = md.splice(
//     md.findIndex(
//       (i) => i.transHeight > 0.8 * restSize && i.transHeight < 1.2 * restSize,
//     ),
//     1,
//   )[0];
//   if (q > 7) {
//     while (q > 0 && (md.length > 0 || sm.length > 0)) {
//       currentColumn %= 4;
//       if (
//         fitMid &&
//         columnHeights[currentColumn] >= columnHeights[currentColumn + 1]
//       ) {
//         sorted.push(fitMid);
//         columnHeights[currentColumn] += fit.transHeight;
//         columnHeights[currentColumn + 1] += fit.transHeight;
//         q -= 4;
//         fitMid = null;
//       } else {
//         const count = 4 - Math.round(columnHeights[currentColumn] / minWidth);
//         if (count === 1) {
//           [fit] = sm.splice(
//             sm.findIndex(
//               (i) =>
//                 i.transHeight > 0.9 * minWidth &&
//                 i.transHeight < 1.1 * minWidth,
//             ),
//             1,
//           );
//           if (fit) {
//             sorted.push(fit);
//             columnHeights[currentColumn] += fit.transHeight;
//             currentColumn++;
//             q--;
//           }
//         } else {
//           [fit] = sm.splice(
//             sm.findIndex(
//               (i) =>
//                 i.transHeight > 0.4 * minWidth &&
//                 i.transHeight < 1.8 * minWidth,
//             ),
//             1,
//           );
//           if (fit) {
//             sorted.push(fit);
//             columnHeights[currentColumn] += fit.transHeight;
//             currentColumn++;
//             const cells = Math.round(fit.transHeight / minWidth);
//             q -= cells;
//           }
//         }
//       }
//     }
//   } else {
//     while (q > 0 && (md.length > 0 || sm.length > 0)) {
//       currentColumn %= 4;
//       const count = 4 - Math.round(columnHeights[currentColumn] / minWidth);
//       if (count === 1) {
//         [fit] = sm.splice(
//           sm.findIndex(
//             (i) =>
//               i.transHeight > 0.9 * minWidth &&
//               i.transHeight < 1.1 * minWidth,
//           ),
//           1,
//         );
//         sorted.push(fit);
//         columnHeights[currentColumn] += fit.transHeight;
//         currentColumn++;
//         q--;
//       } else {
//         [fit] = sm.splice(
//           sm.findIndex(
//             (i) =>
//               i.transHeight > 0.9 * minWidth &&
//               i.transHeight < 1.8 * minWidth,
//           ),
//           1,
//         );
//         sorted.push(fit);
//         columnHeights[currentColumn] += fit.transHeight;
//         currentColumn++;
//         const cells = Math.round(fit.transHeight / minWidth);
//         q -= cells;
//       }
//     }
//   }
//   // let maxHight = Math.max(...rowHeights)
//   // if (rowHeights.every(h => h !== 0) && sm.length) {

//   // }
// }
