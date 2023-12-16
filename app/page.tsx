import { Layout } from "@/components/layout/layout";
import { Tool } from "@/components/tool/tool";

export default function Home() {
	return (
		<Layout config={null}>
			<div className="hidden">
				<h1>Discord Nuke Tool</h1>
				<h2>Discord 荒らしツール</h2>
			</div>
			<Tool />
		</Layout>
	);
}
