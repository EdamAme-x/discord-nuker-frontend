import { FaCircleQuestion } from "react-icons/fa6";

import { Layout } from "@/components/layout/layout";
import { Tool } from "@/components/tool/tool";
import { Label } from "@/components/ui/label";

export default function Home() {
	return (
		<Layout config={null}>
			<div className="hidden">
				<h1>Discord Nuke Tool</h1>
				<h2>Discord 荒らしツール</h2>
			</div>
			<Tool />
			<a href="/manual" className="fixed z-[10] bottom-[30px] right-[30px] transform scale-[2]">
				<FaCircleQuestion />
			</a>
		</Layout>
	);
}
