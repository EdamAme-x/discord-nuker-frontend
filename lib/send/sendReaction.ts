export async function sendReaction(token: string, reactUrl: string): Promise<boolean> {
	const resp = await fetch(reactUrl, {
		headers: {
			accept: "*/*",
			"accept-language": "ja,en-US;q=0.9,en;q=0.8",
			authorization: token,
			"sec-ch-ua":
				'"Not_A Brand";v="8", "Chromium";v="' + Math.floor(Math.random() * 120) + '", "Google Chrome";v="120"',
			"sec-ch-ua-mobile": "?0",
			"sec-ch-ua-platform": '"Windows"',
			"sec-fetch-dest": "empty",
			"sec-fetch-mode": "cors",
			"sec-fetch-site": "same-origin",
			"x-debug-options": "bugReporterEnabled",
			"x-discord-locale": "ja",
			"x-discord-timezone": "Asia/Tokyo"
		},
		body: null,
		method: "PUT",
		mode: "cors",
		credentials: "include"
	});

	return resp.ok;
}
