function genSessionID(): string {
    return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    })
}

async function genFingerPrint(): Promise<string> {
    const UA = 'Mozilla/5.0 (Linux; Android 6.0; Nexus '+Math.floor(Math.random() * 10) / 10+' Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36 Edg/114.0.182' + Math.floor(Math.random() * 100) / 100;

    const headers_finger = {
        'Accept': '*/*',
        'Accept-Language': 'en-US,en;q=0.9',
        'Connection': 'keep-alive',
        'Referer': 'https://discord.com/',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-GPC': '1',
        'User-Agent': UA,
        'X-Track': btoa('{"os":"' + (Math.random() > 0.5 ? "IOS" : "WINDOWS" ) + '","browser":"Safe","system_locale":"en-GB","browser_user_agent":"'+UA+'","browser_version":"15.0","os_v":"","referrer":"","referring_domain":"","referrer_domain_cookie":"stable","client_build_number":9999,"client_event_source":"stable","client_event_source":"stable"}'),
    }

    return (await (await fetch("https://discord.com/api/v9/experiments", {headers: headers_finger})).json()).fingerprint ?? "1191414115344855082._nokxHUJzvNiBOhCRr1h1UAa8Ho";
}

export async function joinToken(token: string, invite: string): Promise<"OK" | "ERROR"> {
    const fingerprint = await genFingerPrint();

    const headers = {
        "authorization": token,
        "x-super-properties": "eyJvcyI6IldpbmRvd3MiLCJicm93c2VyIjoiRmlyZWZveCIsImRldmljZSI6IiIsInN5c3RlbV9sb2NhbGUiOiJlbi1VUyIsImJyb3dzZXJfdXNlcl9hZ2VudCI6Ik1vemlsbGEvNS4wIChXaW5kb3dzIE5UIDEwLjA7IFdpbjY0OyB4NjQ7IHJ2OjkzLjApIEdlY2tvLzIwMTAwMTAxIEZpcmVmb3gvOTMuMCIsImJyb3dzZXJfdmVyc2lvbiI6IjkzLjAiLCJvc192ZXJzaW9uIjoiMTAiLCJyZWZlcnJlciI6IiIsInJlZmVycmluZ19kb21haW4iOiIiLCJyZWZlcnJlcl9jdXJyZW50IjoiIiwicmVmZXJyaW5nX2RvbWFpbl9jdXJyZW50IjoiIiwicmVsZWFzZV9jaGFubmVsIjoic3RhYmxlIiwiY2xpZW50X2J1aWxkX251bWJlciI6MTAwODA0LCJjbGllbnRfZXZlbnRfc291cmNlIjpudWxsfQ==",
        "sec-fetch-dest": "empty",
        "x-debug-options": "bugReporterEnabled",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "accept": "*/*",
        "accept-language": "en-GB",
        "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) discord/0.0.16 Chrome/91.0.4472.164 Electron/13.4.0 Safari/537.36",
        "TE": "trailers",
        "x-fingerprint": fingerprint
    }

    const response = await fetch(`https://discord.com/api/v9/invites/${invite}`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
            "session_id": genSessionID()
        })
    })

    if (!response.ok) {
        return "ERROR";
    }

    return "OK";
}