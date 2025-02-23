"use client";

import clsx from "clsx";

function ClockSpinner({ className }: { className: string }) {
  return (
    <span
      className={clsx(
        className,
        "border-2 border-foreground rounded-full w-14 h-14 relative block"
      )}
    >
      <span
        style={{
          transformOrigin: "1px 1px",
        }}
        className="bg-foreground h-0.5 rounded-full w-4 absolute top-1/2 left-1/2 animate-[spin_9s_linear_infinite]"
      />
      <span
        style={{
          transformOrigin: "1px 1px",
        }}
        className="bg-foreground h-0.5 rounded-full w-5 absolute top-1/2 left-1/2 animate-[spin_3s_linear_infinite]"
      />
    </span>
  );
}

export default ClockSpinner;
