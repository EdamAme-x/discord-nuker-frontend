export function removeReturn(text: string): string {
	return text.replaceAll("\n\n", "\n");
}
