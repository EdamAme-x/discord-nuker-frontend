export const codeParser = {
	encode: (str: string): string => {
		return btoa(encodeURIComponent(str)).split("").reverse().join("");
	},
	decode: (str: string): string => {
		return atob(decodeURIComponent(str.split("").reverse().join("")));
	}
};
