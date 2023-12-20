import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HiSpeakerphone } from "react-icons/hi";
import { CONST } from "@/cons";

export function Footer() {
	return (
		<footer className="p-3">
			<Card>
				<CardHeader>
					<CardTitle>更新情報</CardTitle>
					<CardDescription>お知らせや更新情報を掲載します。</CardDescription>
				</CardHeader>
				<Accordion type="single" collapsible className="w-full">
					{CONST.UPDATES.map((update, i) => (
						<CardContent key={i}>
							<AccordionItem value="item-1">
								<AccordionTrigger>Is it accessible?</AccordionTrigger>
								<AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
							</AccordionItem>
						</CardContent>
					))}
				</Accordion>
				<CardContent>
					<p className="text-sm">
						Created by{" "}
						<a href={"https://twitter.com/" + CONST.ACCOUNT} target="_blank">
							@{CONST.ACCOUNT}
						</a>
					</p>
					<p className="text-sm">
						Sponser <a href={CONST.SPONSER_LINK}>{CONST.SPONSER}</a>
					</p>
				</CardContent>
			</Card>
		</footer>
	);
}
