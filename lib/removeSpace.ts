// 文字列の前後に空白、改行があれば削除

export function removeSpace(text: string): string {
	return text.replace(/(^\s+|\s+$)/g, "").trim();
}
