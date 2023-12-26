
export async function sendWebhook(props: {
    url: string;
    text: string;
    name?: string;
    avatar?: string
}): Promise<boolean> {
    const resp = await fetch(props.url, {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
            content: props.text,
            username: props.name,
            avatar_url: props.avatar
        })
    })

    return resp.ok;
}