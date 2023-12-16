import { ThemeSwitch } from "./theme";

export function Header() {
    return (
        <header className="w-full flex items-center justify-between p-4">
            <p className="text-2xl font-bold">Nuker</p>
            <ThemeSwitch />
        </header>
    )
}
// NOTE: WIP 用議論