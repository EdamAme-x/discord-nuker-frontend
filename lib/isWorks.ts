// Token 生存確認用
import { baseHeaders } from "./baseHeaders";

export async function isWorks(token: string): Promise<boolean | "wip"> {
	const resp = await fetch("https://discord.com/api/v9/users/@me/settings", {
		headers: {
			authorization: token,
			...baseHeaders
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
	} else if ((await resp.json()).code == "40002") {
		return "wip";
	} else {
		return true;
	}
}
