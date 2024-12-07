export const getPrev = (pathname: string) => {
  const p: (string | number)[] = pathname.split("/");
  p[p.length - 1] = +p[p.length - 1] - 1;
  return p.join("/");
};
export const getNext = (pathname: string) => {
  const p: (string | number)[] = pathname.split("/");
  p[p.length - 1] = +p[p.length - 1] + 1;
  return p.join("/");
};