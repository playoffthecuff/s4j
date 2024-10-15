import LangToggler from "../lang-toggler/LangToggler";
import ModeToggler from "../mode-toggler/ModeToggler";

export default function SettingsBar(props: {className?: string, langs: any}) {
  return (
    <div className={`flex gap-5 items-center ${props.className}`}>
      <ModeToggler />
      <LangToggler langs={props.langs}/>
    </div>
  );
}
