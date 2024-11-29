import css from "./styles.module.css";

const START_DELAY = 5;

export default function SmokyText({ text, className }: { text: string, className?: string }) {
  let delay = 0;
  return (
    <div className={className} style={{backfaceVisibility: 'hidden', color: 'transparent'}}>
      <p className="flex flex-wrap gap-x-2 justify-center min-w-[320px] max-w-[380px] font-greet">
        {text.split(" ").map((w, i) => (
          <span key={i} className={css.word}>
            {w.split("").map((c,i) => (
              <span key={i} className={css.char} style={{animationDelay: `${START_DELAY + (delay = (i/10 + Math.random()*0.5))}s`}}>{c}</span>
            ))}
          </span>
        ))}
      </p>
    </div>
  );
}
