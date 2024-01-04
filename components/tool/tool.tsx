"use client";

import { useState } from "react";
import { Tokens } from "@/types/data";

import { LS } from "@/lib/ls";
import { Button } from "../ui/button";
import { AlertDestructive } from "../ui/error";
import { Label } from "../ui/label";
import { Reaction } from "./reaction";
import { Sender } from "./sender";
import { TokenPanel } from "./tokenPanel";
import { Webhook } from "./webhook";

export function Tool() {
	const [data, setData] = useState<Tokens>(() => {
		if (typeof window !== "undefined") {
			if (!LS.get("tokens")) {
				LS.set("tokens", []);
				return [];
			} else {
				return JSON.parse(LS.get("tokens") as string);
			}
		} else {
			return [];
		}
	});

	return (
		<div className="w-screen flex flex-col justify-center items-center space-y-4">
			<TokenPanel data={data} setData={setData} />
			{data.length <= 0 && (
				<div className="h-[50vh] flex flex-col justify-center items-center">
					<AlertDestructive text={"TOKEN が追加されていません。"} />
				</div>
			)}
			{data.length > 0 && (
				<>
					<Sender data={data} setData={setData} />
					<Reaction data={data} setData={setData} />
					<Webhook />
					<Label>Joiner, randomMention, withProxy etc 近日公開</Label>
				</>
			)}
		</div>
	);
}
