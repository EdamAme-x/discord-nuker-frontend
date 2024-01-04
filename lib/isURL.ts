export function isURL(string: string): boolean {
	try {
		new URL(string);
		return true;
	} catch (_e) {
		return false;
	}
}
