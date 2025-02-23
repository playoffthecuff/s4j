import clsx from "clsx";

export function FlatDateBlock({
  dt,
  className,
}: {
  dt: string;
  className?: string;
}) {
  const d = new Date(dt);
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const fMonth = `${("" + month).padStart(2, "0")}`;
  const date = d.getDate();
  const fDate = `${("" + date).padStart(2, "0")}`;

  return (
    <time
      dateTime={`${year}-${fMonth}-${fDate}`}
      className={clsx(
        "border-2 px-2 py-1 opacity-80 rounded-sm items-end font-mono w-fit leading-snug",
        className
      )}
    >
      <span className="leading-none font-light">{`${fDate}.${fMonth}.${year}`}</span>
    </time>
  );
}
