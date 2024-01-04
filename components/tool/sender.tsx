import { useEffect, useState } from "react";
import { Tokens } from "@/types/data";
import { IoSettingsSharp } from "react-icons/io5";

import { removeReturn } from "@/lib/removeReturn";
import { sendMessage as sendMessager } from "@/lib/send/sendMessage";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const presets: string[] = [
	`
荒らし共栄圏万歳！
{{link2}}
{{random_mention}}
{{random2}}
`,
	`
荒らし共栄圏最強！
{{link}}
{{random}} 
{{date}}は荒らし共栄圏の勝利記念日だ！
`,
	`
こんにちは！
https://twitter.com/amex2189?{{random2}}
`
];

type Config = {
	interval: number;
	channels: string[];
};

const initConfig: Config = {
	interval: 1000,
	channels: []
};

export function Sender(props: { data: Tokens; setData: (data: Tokens) => void }) {
	const [sendMessage, setSendMessage] = useState<string>(`@everyone
# 荒らし共栄圏最強
# [荒らし共栄圏に参加](https://ctkpaarr.data.blog/#Discord)
https://ctkpaarr.data.blog/
https://discord.gg/annycW3Xrk
# 荒らし共栄圏万歳
ーーーーーーーーーーーーーーーー
（画像） https://imgur.com/LacFtDP
（画像） https://imgur.com/gQkpAYe
（画像） https://imgur.com/mOlUpn3	
{{random2}}
`);

	return (
		<div className="w-[350px] flex flex-col justify-center items-center">
			<Label className="text-xl font-bold w-full px-[5px] inline-flex justify-center items-center my-3">
				Sender
				<Setting
					data={props.data}
					setData={props.setData}
					settings={{
						sendMessage,
						setSendMessage
					}}>
					<IoSettingsSharp className="ml-auto" />
				</Setting>
			</Label>
			<Textarea
				value={sendMessage}
				onChange={e => {
					setSendMessage(e.target.value);
				}}
			/>
			<div className="mt-5 w-4/5">
				<OperationPanel {...props} sendMessage={sendMessage} />
			</div>
		</div>
	);
}

function OperationPanel(props: { data: Tokens; setData: (data: Tokens) => void; sendMessage: string }) {
	const [config, setConfig] = useState<Config>(initConfig);
	const [log, setLog] = useState<string[]>([""]);
	const [started, setStarted] = useState<boolean>(false);
	const ok = config.channels.length === 0 || (config.channels.length > 0 ? config.channels[0] === "" : false);

	useEffect(() => {
		let sendInterval: any;

		if (started) {
			setLog(log => {
				return [...log, `[!] Starting... `];
			});

			sendInterval = setInterval(() => {
				config.channels.forEach(channel => {
					props.data.forEach(token => {
						sendMessager(channel, messageParser(props.sendMessage), token.token)
							.then(() => {
								setLog(log => {
									if (log.length > 100) {
										return [...log.slice(2), `[+] Sent to ${channel}`];
									}
									return [...log, `[+] Sent to ${channel}`];
								});
							})
							.catch(() => {
								setLog(log => {
									if (log.length > 100) {
										return [...log.slice(2), `[-] Sent error to ${channel}`];
									}
									return [...log, `[-] Sent error to ${channel}`];
								});
							});
					});
				});
			}, config.interval);
		}

		return () => {
			setLog(log => {
				return [...log, `[!] Stopping... `];
			});
			clearInterval(sendInterval);
		};
	}, [started]);

	return (
		<div className="flex flex-col justify-center items-center space-y-2">
			<Label className="my-3">Interval</Label>
			<div className="flex w-full">
				<Input
					type="number"
					value={config.interval}
					onChange={e => {
						setConfig({
							...config,
							interval: parseInt(e.target.value)
						});
					}}
					className="w-5/6 h-full"
				/>
				<Label className="w-1/6 flex justify-center items-center">ms</Label>
			</div>
			<Label className="my-3">Channels</Label>
			<Textarea
				value={config.channels.join("\n")}
				onChange={e => {
					setConfig({
						...config,
						channels: removeReturn(e.target.value).split("\n")
					});
				}}
				placeholder={"channelId\nchannelId\n..."}
			/>
			<div className="flex w-full justify-around">
				<Button
					className="w-1/3"
					disabled={started || ok}
					onClick={() => {
						setStarted(true);
					}}>
					Start
				</Button>
				<Button
					className="w-1/3"
					disabled={!started}
					onClick={() => {
						setStarted(false);
					}}>
					Stop
				</Button>
			</div>
			<Label className="my-3">Log</Label>
			<Textarea value={log.join("\n")} readOnly></Textarea>
		</div>
	);
}

function Setting(props: {
	children: React.ReactNode;
	data: Tokens;
	setData: (data: Tokens) => void;
	settings: {
		sendMessage: string;
		setSendMessage: (sendMessage: string) => void;
	};
}) {
	return (
		<Dialog>
			<DialogTrigger asChild>{props.children}</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Settings</DialogTitle>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<Preview {...props} />
					<Presets {...props} />
				</div>
			</DialogContent>
		</Dialog>
	);
}

function Preview(props: {
	children: React.ReactNode;
	data: Tokens;
	setData: (data: Tokens) => void;
	settings: {
		sendMessage: string;
		setSendMessage: (sendMessage: string) => void;
	};
}) {
	return (
		<DialogTemplate title="Preview" button={<>Preview</>} className="">
			<Textarea value={messageParser(props.settings.sendMessage)} readOnly />
		</DialogTemplate>
	);
}

function Presets(props: {
	children: React.ReactNode;
	data: Tokens;
	setData: (data: Tokens) => void;
	settings: {
		sendMessage: string;
		setSendMessage: (sendMessage: string) => void;
	};
}) {
	const [preset, setPreset] = useState("");

	const selectPreset = (i: string) => {
		setPreset(presets[parseInt(i)].replace("\n", ""));
	};

	const patch = () => {
		props.settings.setSendMessage(preset);
	};

	return (
		<DialogTemplate title="Presets" button={<>Presets</>} className="">
			<div className="w-full flex flex-col justify-center items-center space-y-3">
				<Label>困ったときはこれ！</Label>
				<Select onValueChange={selectPreset}>
					<SelectTrigger className="w-[180px]">
						<SelectValue placeholder="Presets" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Presets</SelectLabel>
							{presets.map((preset, i) => (
								<SelectItem key={i} value={i.toString()}>
									{preset}
								</SelectItem>
							))}
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>
			<Textarea
				value={preset}
				onChange={e => {
					setPreset(e.target.value);
				}}
			/>
			<Button onClick={patch}>Patch</Button>
		</DialogTemplate>
	);
}

export function DialogTemplate(props: {
	title: string;
	button: React.ReactNode;
	className: string;
	children: React.ReactNode;
	outline?: null | boolean;
}) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant={!props.outline ? "outline" : "default"} className={props.className}>
					{props.button}
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>{props.title}</DialogTitle>
				</DialogHeader>
				<div className="grid gap-4 py-4">{props.children}</div>
			</DialogContent>
		</Dialog>
	);
}

function messageParser(text: string): string {
	const randomString = Math.random().toString(36).substring(2, 8);

	text = text.replaceAll("{{random}}", randomString);

	const dateString = new Date(Date.now()).toLocaleDateString("ja");

	text = text.replaceAll("{{date}}", dateString);

	const spLink = "https://ctkpaarr.data.blog";

	text = text.replaceAll("{{link}}", spLink);

	const spLink2 = "https://disocrd.gg/ctkpaarr";

	text = text.replaceAll("{{link2}}", spLink2);

	const hyper_random = btoa((Date.now() * Math.random()).toString(36)).replaceAll("=", "");

	text = text.replaceAll("{{random2}}", hyper_random);

	return text;
}
