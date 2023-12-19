import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function Footer() {
	return (
		<footer className="p-3">
			<Card>
				<CardHeader>
					<CardTitle>更新情報</CardTitle>
					<CardDescription>お知らせや更新情報を掲載します。</CardDescription>
				</CardHeader>
				<CardContent>
					<p>Content</p>
				</CardContent>
			</Card>
		</footer>
	);
}
