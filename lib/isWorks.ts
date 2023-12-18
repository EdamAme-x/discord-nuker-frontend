// Token 生存確認用

export async function isWorks(token: string): Promise<boolean> {
	const resp = await fetch("https://discord.com/api/v9/users/@me/settings", {
		headers: {
			accept: "/",
			"accept-language": "ja,en-US;q=0.9,en;q=0.8",
			authorization: token,
			"content-type": "application/json",
			"sec-ch-ua": '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
			"sec-ch-ua-mobile": "?0",
			"sec-ch-ua-platform": '"Windows"',
			"sec-fetch-dest": "empty",
			"sec-fetch-mode": "cors",
			"sec-fetch-site": "cross-site"
		},
		referrer: "https://discord.com/channels/@me",
		referrerPolicy: "strict-origin-when-cross-origin",
		body: '{"status":"online"}',
		method: "PATCH",
		mode: "cors",
		credentials: "include"
	});

	if (resp.status === 401) {
		return false;
	} else {
		return true;
	}
}
