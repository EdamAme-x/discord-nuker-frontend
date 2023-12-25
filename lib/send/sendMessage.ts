export async function sendMessage(channelId: string, message: string, token: string): Promise<boolean> {
	const resp = await fetch("https://discord.com/api/v9/channels/" + channelId + "/messages", {
		headers: {
			accept: "*/*",
			"accept-language": "ja,en-US;q=0.9,en;q=0.8",
			authorization: token,
			"content-type": "application/json",
			"sec-ch-ua": '"Not_A Brand";v="8", "Chromium";v="' + Math.floor(Math.random() * 120) + '", "Google Chrome";v="120"',
			"sec-ch-ua-mobile": "?0",
			"sec-ch-ua-platform": '"Windows"',
			"sec-fetch-dest": "empty",
			"sec-fetch-mode": "cors",
			"sec-fetch-site": "same-origin",
			"x-debug-options": "bugReporterEnabled",
			"x-discord-locale": "ja",
			"x-discord-timezone": "Asia/Tokyo",
		},
		referrer: "https://discord.com/channels/1115195558743781408/" + channelId,
		referrerPolicy: "strict-origin-when-cross-origin",
		body: JSON.stringify({ mobile_network_type: "unknown", content: message, tts: false, flags: 0 }),
		method: "POST",
		mode: "cors",
		credentials: "include"
	});

    return resp.ok;
}
