import { isURL } from "../isURL";
import { isWebhook } from "../isWebhook";

export async function sendWebhook(props: {
	url: string;
	content: string;
	name?: string;
	avatar?: string;
	embeds?: object;
}): Promise<boolean> {
	if (!isWebhook(props.url)) {
		return false;
	}

	const baseBody: {
		content: string;
		username?: string;
		avatar_url?: string;
		embeds?: object;
	} = {
		content: 'plz search "ame_x"'
	};

	if (typeof props.embeds !== "undefined") {
		baseBody["embeds"] = props.embeds;
	}

	if (typeof props.name !== "undefined") {
		baseBody["username"] = props.name;
	}

	if (typeof props.avatar !== "undefined") {
		if (isURL(props.avatar)) {
			return false;
		}

		baseBody["avatar_url"] = props.avatar;
	}

	baseBody["content"] = props.content;

	const resp = await fetch(props.url, {
		headers: {
			"Content-Type": "application/json"
		},
		method: "POST",
		body: JSON.stringify({
			...baseBody
		})
	});

	return resp.ok;
}
