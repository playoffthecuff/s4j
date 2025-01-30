export default function getSubstrBeforeAfter(
  s: string,
  w: string,
  pre: number,
  long: number,
  prefix: string = "",
  postfix: string = "",
) {
  const startIndex = s.match(new RegExp(w, "i"))?.index ?? 0;
  const start = s.slice(0, startIndex).slice(-pre);
  const post = long - start.length;
  const end = s.slice(startIndex, startIndex + post);
  return (
    (startIndex > pre ? prefix : "") +
    start +
    end +
    (start.length + end.length < s.length ? postfix : "")
  );
}
