import { IoHomeSharp } from "react-icons/io5";

import { Layout } from "@/components/layout/layout";

export default function Manual() {
	return (
		<Layout
			config={{
				header: true,
				footer: false
			}}>
			<div className="hidden">
				<h1>Discord Nuke Tool</h1>
				<h2>Discord 荒らしツール</h2>
			</div>
			<a href="/" className="fixed z-[10] bottom-[30px] right-[30px] transform scale-[2]">
				<IoHomeSharp />
			</a>
		</Layout>
	);
}