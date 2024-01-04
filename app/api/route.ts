import initCycleTLS from "cycleTLS";

function genSessionID(): string {
	return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function (c) {
		var r = (Math.random() * 16) | 0,
			v = c === "x" ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}

export async function POST(request: Request) {
	return new Response("it dont works");

	const cycleTLS = await initCycleTLS({
		timeout: 20
	});

	const payload = await request.json();
	let id = "1191414115344855" + Date.now().toString().slice(-3) + "._nokxHUJzvNiBOhCRr1h1UAa8Ho";
	let token = "";
	let code = "ctkpaarr";

	if ("id" in payload) {
		id = payload.id;
	}

	if ("token" in payload) {
		id = atob(payload.token);
	} else {
		return new Response("ERROR", { status: 400 });
	}

	if ("code" in payload) {
		code = atob(payload.code);
	} else {
		return new Response("ERROR", { status: 400 });
	}

	const response = await cycleTLS(
		`https://discord.com/api/v9/invites/${code}`,
		{
			headers: {
				authorization: token,
				"x-super-properties":
					"eyJvcyI6IldpbmRvd3MiLCJicm93c2VyIjoiRmlyZWZveCIsImRldmljZSI6IiIsInN5c3RlbV9sb2NhbGUiOiJlbi1VUyIsImJyb3dzZXJfdXNlcl9hZ2VudCI6Ik1vemlsbGEvNS4wIChXaW5kb3dzIE5UIDEwLjA7IFdpbjY0OyB4NjQ7IHJ2OjkzLjApIEdlY2tvLzIwMTAwMTAxIEZpcmVmb3gvOTMuMCIsImJyb3dzZXJfdmVyc2lvbiI6IjkzLjAiLCJvc192ZXJzaW9uIjoiMTAiLCJyZWZlcnJlciI6IiIsInJlZmVycmluZ19kb21haW4iOiIiLCJyZWZlcnJlcl9jdXJyZW50IjoiIiwicmVmZXJyaW5nX2RvbWFpbl9jdXJyZW50IjoiIiwicmVsZWFzZV9jaGFubmVsIjoic3RhYmxlIiwiY2xpZW50X2J1aWxkX251bWJlciI6MTAwODA0LCJjbGllbnRfZXZlbnRfc291cmNlIjpudWxsfQ==",
				"sec-fetch-dest": "empty",
				"x-debug-options": "bugReporterEnabled",
				"sec-fetch-mode": "cors",
				"sec-fetch-site": "same-origin",
				accept: "*/*",
				"accept-language": "en-GB",
				"user-agent":
					"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) discord/0.0.16 Chrome/91.0.4472.164 Electron/13.4.0 Safari/537.36",
				TE: "trailers",
				"x-fingerprint": id ?? "1191414115344855082._nokxHUJzvNiBOhCRr1h1UAa8Ho",
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				session_id: genSessionID()
			})
		},
		"post"
	);

	cycleTLS.exit();

	if (response.status === 200) {
		return new Response("OK", { status: 200 });
	}

	return new Response("ERROR", { status: 400 });
}
