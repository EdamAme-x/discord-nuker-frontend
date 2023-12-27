import { useEffect, useState } from "react";
import { Tokens } from "@/types/data";

import { sendReaction } from "@/lib/send/sendReaction";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function Reaction(props: { data: Tokens; setData: (data: Tokens) => void }) {
	const [url, setUrl] = useState<string>("");
	const [log, setLog] = useState<
		{
			r: boolean;
			i: string;
		}[]
	>([]);
	const isReactURL = /htt(p|ps)\:\/\/discord.com\/api\/v\d\/channels\/\d+\/messages\/\d+\/reactions\/.*/.test(url);
	const react = () => {
		const result = props.data.map(async i => {
			const r: boolean = await sendReaction(i.token, url);

			return {
				r,
				i: i.token
			};
		});
	};

	return (
		<div className="w-[350px] flex flex-col justify-center items-center">
			<Label className="text-xl font-bold w-full px-[5px] inline-flex justify-left items-center my-3">
				Reaction
			</Label>
			<div className="flex w-full items-center space-x-2">
				<Input
					value={url}
					onChange={e => {
						setUrl(e.target.value);
					}}
					className="w-4/5"
					placeholder="https://discord.com/api/v9/channels/[GuildId]/messages/[ChId]/reactions/[EmojiName]%3A[Guild_Id]/%40me?location=Message&type=0"
				/>
				<Button onClick={react} className="w-1/5" disabled={!isReactURL}>
					React
				</Button>
			</div>
			<Textarea value={log.map(x => {
                if (x.r) {
                    return `(+) ${x.i}: Success`
                }else {
                    return `(-) ${x.i}: Failed`
                }
            }).join("\n")} readOnly />
		</div>
	);
}
