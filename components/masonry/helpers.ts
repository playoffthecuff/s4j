import { Img } from "@/lib/types/sanity-data";
import { CSSProperties } from "react";

export type CommonProps = {
  aspect: number;
  blockWidth: number;
  columnsCount: number;
  gap: number;
  items: Img[];
  maxCells: number;
  pX: number;
  rowsByImgCount: number;
};

interface DataForRender extends CommonProps {
  columnWidth: number;
  matches: boolean[];
  windowWidth: number;
}

interface ImgExt extends Img {
  columnCells: number;
  rowCells: number;
}

const calcInitRowHeight = (
  height: number,
  gap: number,
  rowsByImgCount: number,
  precision: number = 10,
) =>
  Math.round(
    ((height - gap * (rowsByImgCount - 1)) * precision) / rowsByImgCount,
  ) / precision;

const calcRowHeight = (
  columnsCount: number,
  gap: number,
  aspect: number,
  rowsByImgCount: number,
  spacers: number,
) => {
  const tRW = aspect * columnsCount * rowsByImgCount;
  const vw = 100 / tRW;
  const px = spacers / tRW + ((rowsByImgCount - 1) * gap) / rowsByImgCount;
  return `calc(${vw}vw - ${px}px)`;
};

export const getRenderData = (data: DataForRender) => {
  const {
    aspect,
    blockWidth,
    columnWidth,
    columnsCount,
    gap,
    items,
    matches,
    maxCells,
    pX,
    rowsByImgCount,
    windowWidth,
  } = data;
  const spacers = 2 * pX + (columnsCount - 1) * gap;
  const computedHeight = Math.round((columnWidth * 10) / aspect) / 10;
  const widths = items.map((i) => i.width);
  const [minWidth, maxWidth] = [Math.min(...widths), Math.max(...widths)];
  const initRowHeight = calcInitRowHeight(computedHeight, gap, rowsByImgCount);

  const gridTemplateColumns = `repeat(auto-fit, minmax(${columnWidth}px, 1fr))`;
  const queries = Array.from(
    { length: columnsCount - 1 },
    (_, i) =>
      `max-width: ${columnWidth * (columnsCount - i) + (columnsCount - i - 1) * gap + 2 * pX}px`,
  );
  const defaultBreakPoint = [
    {
      query: `min-width: ${blockWidth}px`,
      matches: true,
      styles: {
        gridAutoRows: initRowHeight,
        gridTemplateColumns,
      },
    },
  ];

  const breakPoints = matches.map((matches, i) => {
    const styles: CSSProperties = {
      gridAutoRows: calcRowHeight(
        columnsCount - 1 - i,
        gap,
        aspect,
        rowsByImgCount,
        spacers,
      ),
      gridTemplateColumns,
    };
    return { query: queries[i], matches, styles };
  });
  const totalBreakPoints = [...defaultBreakPoint, ...breakPoints];
  const itemsExt: ImgExt[] = items.map((i) => {
    const step = (maxWidth - minWidth) / maxCells;

    const computedColumnCells = Math.ceil(Math.max(i.width - minWidth, 1) / step);

    const computedRowCells = Math.round(
      (i.height * (columnWidth * computedColumnCells - (computedColumnCells - 1) * gap)) /
        (initRowHeight + gap) /
        i.width,
    );
    const maxWindowColumns = Math.floor((windowWidth - 2 * pX + gap) / (columnWidth + gap));
    const columnCells = Math.min(computedColumnCells, maxWindowColumns);
    const rowCells = Math.round(computedRowCells / (columnCells === computedColumnCells ? 1 : computedColumnCells / maxWindowColumns));
    return { ...i, columnCells, rowCells };
  });
  return { totalBreakPoints, itemsExt };
};
