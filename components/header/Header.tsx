import { Headr } from "@/app/[lang]/layout";
import Logo from "../logo/Logo";
import Navbar from "../navbar/Navbar";
import SettingsBar from "../settings-bar/SettingsBar";

export default async function Header(props: {header: Headr}) {
  return (
    <header className="w-screen shadow fixed z-20 max-sm:pr-16 bg-background top-0">
      <div className="max-w-7xl mx-auto pl-4 pr-6 py-2 flex justify-between">
        <Logo/>
        <Navbar className="max-sm:hidden" orientation="horizontal" menu={props.header.menu}/>
        <SettingsBar langs={props.header.langs}/>
      </div>
    </header>
  );
}
