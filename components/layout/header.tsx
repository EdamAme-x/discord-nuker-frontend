import Image from "next/image";

import { Label } from "@/components/ui/label";
import { ThemeSwitch } from "./theme";

export function Header() {
	return (
		<header className="w-full flex items-center justify-between p-4">
			<Label className="text-2xl font-bold inline-flex items-center">
				<Image src="/icon.gif" alt="Logo" width={35} height={35} className="rounded-full mr-3" />
				Discord Nuker α版
			</Label>
			<ThemeSwitch />
		</header>
	);
}
// NOTE: WIP 用議論
