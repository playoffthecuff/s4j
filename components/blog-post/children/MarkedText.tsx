import { Fragment } from "react";

export function MarkedText({
  text,
  marks,
}: {
  text: string;
  marks?: string[];
}) {
  const regexp = marks?.length ? new RegExp(marks.join("|"), "gi") : null;
  const parts = regexp ? text.split(regexp) : [];
  const matches = regexp ? text.match(regexp) : [];
  
  return (
    <>
      {marks?.length
        ? parts.map((p, i) => (
            <Fragment key={i}>
              {p}
              {matches && matches[i] && <mark>{matches[i]}</mark>}
            </Fragment>
          ))
        : text}
    </>
  );
}
