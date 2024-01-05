import { useEffect, useState } from "react";
import { Tokens } from "@/types/data";

import { sendWebhook } from "@/lib/send/sendWebhook";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { isWebhook } from "./../../lib/isWebhook";

export function Webhook() {
	const [url, setUrl] = useState<string>("");
	const [started, setStarted] = useState<boolean>(false);
	const isWebhookURL = isWebhook(url);
	const [log, setLog] = useState<string[]>([]);
	const [config, setConfig] = useState<{
		interval: number;
		content: string;
		name: {
			use: boolean;
			content: string;
		};
		avatar: {
			use: boolean;
			content: string;
		};
		embeds: {
			use: boolean;
			content: object;
		};
	}>({
		interval: 500,
		content: "@everyone 荒らし共栄圏万歳！ https://ctkpaarr.org",
		name: {
			use: false,
			content: "荒らし共栄圏"
		},
		avatar: {
			use: false,
			content: "https://discord.com/assets/847541504914fd33810e70a0ea73177e.ico"
		},
		embeds: {
			use: false,
			content: [
				{
					title: "Hello!",
					description: "Hi! :grinning:"
				}
			]
		}
	});
	const [openNameConfig, setOpenNameConfig] = useState<boolean>(false);
	const [openAvatarConfig, setOpenAvatarConfig] = useState<boolean>(false);
	const [openEmbedsConfig, setOpenEmbedsConfig] = useState<boolean>(false);

	const [openMax, setOpenMax] = useState<boolean>(false);
	const [max, setMax] = useState<number>(100);

	useEffect(() => {
		let interval: any;

		if (started) {
			if (!isWebhookURL) {
				setStarted(false);
			}

			let now = 0;

			setLog(prev => [...prev.slice(0, 100), `[@] Webhook: ${url}`]);

			interval = setInterval(async () => {
				const res = await sendWebhook({
					url,
					content: config.content,
					name: config.name.use ? config.name.content : undefined,
					avatar: config.avatar.use ? config.avatar.content : undefined,
					embeds: config.embeds.use ? config.embeds.content : undefined
				});

				if (res) {
					setLog(prev => [...prev.slice(0, 100), `[+] Webhook sent`]);
				} else {
					setLog(prev => [...prev.slice(0, 100), `[-] Webhook failed`]);
				}

				now++;

				if (now >= max && openMax) {
					setStarted(false);
				}
			}, config.interval);
		}

		return () => {
			clearInterval(interval);
			setLog(prev => [...prev.slice(0, 100), `[@] Webhook: ${url} stopped`]);
		};
	}, [started]);

	return (
		<div className="w-[350px] flex flex-col justify-center items-center">
			<Label className="text-xl font-bold w-full px-[5px] inline-flex justify-left items-center my-3">
				Webhook
			</Label>
			<Input
				value={url}
				onChange={e => {
					setUrl(e.target.value);
				}}
				className="w-[90%]"
				placeholder="https://discord.com/api/webhooks/[channel]/[id]"
			/>
			<Label className="text-sm font-bold w-full px-[5px] inline-flex justify-left items-center my-3">
				Interval
			</Label>
			<div className="flex w-full justify-center items-center space-x-4 my-3">
				<Input
					value={config.interval}
					onChange={e => {
						setConfig({
							...config,
							interval: Number.isNaN(parseInt(e.target.value)) ? 500 : parseInt(e.target.value)
						});
					}}
					className="w-[90%] mr-2"
					type="number"
					placeholder="500"
				/>
				ms
			</div>
			<Label className="text-sm font-bold w-full px-[5px] inline-flex justify-left items-center my-3">
				Content
			</Label>
			<div className="flex w-full justify-center items-center space-x-4 my-3">
				<Textarea
					value={config.content}
					onChange={e => {
						setConfig({ ...config, content: e.target.value });
					}}
					className="w-[90%] mr-2"
					placeholder="@everyone 荒らし共栄圏万歳！ https://ctkpaarr.org"
				/>
			</div>
			<Label className="text-sm font-bold w-full px-[5px] inline-flex justify-left items-center my-3">
				Options
			</Label>
			<div className="flex w-full justify-around items-center space-x-2 my-3">
				<div className="flex space-x-2">
					<Checkbox
						id="name"
						checked={config.name.use}
						onClick={(e: any) => {
							setOpenNameConfig(!config.name.use);
							setConfig({
								...config,
								name: {
									...config.name,
									use: !config.name.use
								}
							});
						}}
					/>
					<label
						htmlFor="name"
						className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
						Name
					</label>
				</div>
				<div className="flex space-x-2">
					<Checkbox
						id="avatar"
						checked={config.avatar.use}
						onClick={(e: any) => {
							setOpenAvatarConfig(!config.avatar.use);
							setConfig({
								...config,
								avatar: {
									...config.avatar,
									use: !config.avatar.use
								}
							});
						}}
					/>
					<label
						htmlFor="avatar"
						className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
						Avatar
					</label>
				</div>
				<div className="flex space-x-2">
					<Checkbox
						id="embeds"
						checked={config.embeds.use}
						onClick={(e: any) => {
							setOpenEmbedsConfig(!config.embeds.use);
							setConfig({
								...config,
								embeds: {
									...config.embeds,
									use: !config.embeds.use
								}
							});
						}}
					/>
					<label
						htmlFor="embeds"
						className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
						embeds
					</label>
				</div>
				<div className="flex space-x-2">
					<Checkbox
						id="max"
						checked={openMax}
						onClick={(e: any) => {
							setOpenMax(!openMax);
						}}
					/>
					<label
						htmlFor="max"
						className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
						Max
					</label>
				</div>
			</div>
			<div className="w-[95%]">
				{openNameConfig && (
					<div className="flex flex-col w-full justify-center items-center space-x-4 my-3">
						<Label className="text-sm font-bold w-full px-[5px] inline-flex justify-left ml-10 items-center my-3">
							Name
						</Label>
						<Input
							value={config.name.content}
							onChange={e => {
								setConfig({
									...config,
									name: {
										...config.name,
										content: e.target.value
									}
								});
							}}
							className="w-[90%] mr-2"
							placeholder="name"
						/>
					</div>
				)}
				{openAvatarConfig && (
					<div className="flex flex-col w-full justify-center items-center space-x-4 my-3">
						<Label className="text-sm font-bold w-full px-[5px] inline-flex justify-left ml-10 items-center my-3">
							Avatar URL
						</Label>
						<Input
							value={config.avatar.content}
							onChange={e => {
								setConfig({
									...config,
									avatar: {
										...config.avatar,
										content: e.target.value
									}
								});
							}}
							className="w-[90%] mr-2"
							placeholder="avatarURL"
						/>
					</div>
				)}
				{openEmbedsConfig && (
					<div className="flex flex-col w-full justify-center items-center space-x-4 my-3">
						<Label className="text-sm font-bold w-full px-[5px] inline-flex justify-left ml-10 items-center my-3">
							Embeds
						</Label>
						<Textarea
							value={JSON.stringify(config.embeds.content, null, 2)}
							onChange={e => {
								const isJSON = (json: string) => {
									try {
										JSON.parse(json);
										return true;
									} catch (e) {
										return false;
									}
								};

								const result = isJSON(e.target.value) ? JSON.parse(e.target.value) : e.target.value;

								if (!result) return;

								setConfig({
									...config,
									embeds: {
										...config.embeds,
										content: JSON.parse(e.target.value)
									}
								});
							}}
							className="w-[90%] mr-2"
							placeholder="embed"
						/>
					</div>
				)}
				{openMax && (
					<div className="flex flex-col w-full justify-center items-center space-x-4 my-3">
						<Label className="text-sm font-bold w-full px-[5px] inline-flex justify-left ml-10 items-center my-3">
							Max
						</Label>
						<Input
							value={max}
							onChange={e => {
								setMax(parseInt(e.target.value));
							}}
							className="w-[90%]"
							placeholder="max"
						/>
					</div>
				)}
			</div>
			<div className="flex w-full justify-around items-center space-x-2 my-3">
				<Button onClick={() => setStarted(true)} className="w-2/5" disabled={started || !isWebhookURL}>
					Start
				</Button>
				<Button onClick={() => setStarted(false)} className="w-2/5" disabled={!started}>
					Stop
				</Button>
			</div>
			<Textarea value={log.join("\n")} readOnly />
		</div>
	);
}
