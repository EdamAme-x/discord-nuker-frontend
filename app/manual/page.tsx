import { IoHomeSharp } from "react-icons/io5";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
			<div className="w-full flex flex-col justify-center items-center">
				<Label className="text-2xl">Q & A</Label>
				<Accordion type="single" collapsible className="w-full">
						<CardContent>
							<AccordionItem value="items-1">
								<AccordionTrigger>
									Q. 使い方分からん
								</AccordionTrigger>
								<AccordionContent className="w-4/5 mx-auto">
									<a href="https://discord.gg/ctkpaarr">Discord</a>で質問するか、このヘルプ(Q & A)を読んでください。
								</AccordionContent>
							</AccordionItem>
						</CardContent>
				</Accordion>
			</div>
		</Layout>
	);
}
