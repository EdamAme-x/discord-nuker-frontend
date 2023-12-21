import { CONST } from "@/cons";
import { HiSpeakerphone } from "react-icons/hi";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

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
							<AccordionItem value={"item-" + i}>
								<AccordionTrigger>
									<HiSpeakerphone /> {update.title}
								</AccordionTrigger>
								<AccordionContent className="w-4/5 mx-auto">
									<p className="text-xs">{update.date}</p>
									{update.content}
								</AccordionContent>
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
