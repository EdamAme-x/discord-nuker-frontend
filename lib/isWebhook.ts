export function isWebhook(url: string): boolean {
	return (
		url.startsWith("https://discord.com/api/webhooks/") || url.startsWith("https://discordapp.com/api/webhooks/")
	);
}
