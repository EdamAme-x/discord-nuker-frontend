import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { CONST } from "@/cons";

export function Footer() {
	return (
		<footer className="p-3">
			<Card>
				<CardHeader>
					<CardTitle>更新情報</CardTitle>
					<CardDescription>お知らせや更新情報を掲載します。</CardDescription>
				</CardHeader>
				<CardContent>
					{/* NOTE: UPDATES */}
				</CardContent>
				<CardContent>
					<p className="text-sm">Created by <a href={"https://twitter.com/" + CONST.ACCOUNT} target="_blank">@{CONST.ACCOUNT}</a></p>
					<p className="text-sm">Sponser <a href={CONST.SPONSER_LINK}>{CONST.SPONSER}</a></p>
				</CardContent>
			</Card>
		</footer>
	);
}
