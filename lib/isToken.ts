export function isToken(token: string): boolean {
	// eg = Mjc2MDY1OTc4MzM1NjI1MjE2.DNTGNw.cbNgca_1_9mJ9dal7bdnNkLcPxE
	const checkRegex = /[a-zA-Z0-9_-]{23,28}\.[a-zA-Z0-9_-]{6,7}\.[a-zA-Z0-9_-]{27}/;

	return checkRegex.test(token);
}
