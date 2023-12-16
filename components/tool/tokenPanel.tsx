import { Tokens } from "@/types/data";
import { LS } from "@/lib/ls";
import { MultiSelect } from "@/components/ui/multi-select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { isToken } from "@/lib/isToken";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoSettingsSharp } from "react-icons/io5";

export function TokenPanel(props: { data: Tokens; setData: (data: Tokens) => void }) {
	const [token, setToken] = useState<string>("");
	const [tokenCheck, setTokenCheck] = useState<boolean>(false);

	const addToken = () => {
		if (props.data.find(i => i.token === token)) {
			toast.error("既に存在します!", {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: !document.querySelector("body[class='dark']") ? "light" : "dark"
			});
			return;
		}

		props.setData([
			...props.data,
			{
				token: token,
				isEnabled: true
			}
		]);
		LS.set("tokens", [
			...props.data,
			{
				token: token,
				isEnabled: true
			}
		]);
	};

	return (
		<div className="w-[350px] flex flex-col justify-center items-center">
			<Label className="text-xl font-bold w-full px-[5px] inline-flex justify-center items-center my-3">
				TokenPanel{" "}
				<Setting data={props.data} setData={props.setData}>
					<IoSettingsSharp className="ml-auto" />
				</Setting>
			</Label>
			<MultiSelect
				options={props.data.map(i => {
					return {
						value: i.token,
						label: i.token
					};
				})}
				selected={props.data.map(i => i.token)}
                // @ts-ignore NOTE: LIB SIDE ERROR
				onChange={(e: string) => {
                    // @ts-ignore NOTE: LIB SIDE ERROR
                    const result = props.data.filter(d => d.token !== e)
                    props.setData(result)
                    LS.set("tokens", result)
                }}
                className="w-[350px]"
			/>
			<div className="w-full flex justify-around items-center">
				<Input
					type="text"
					placeholder="Token"
					// @ts-ignore NOTE: LIB SIDE ERROR
					onChange={(event: InputEvent) => {
						const valid = isToken((event.target as HTMLInputElement).value);
						if (!valid) {
							setTokenCheck(false);
						} else {
							setTokenCheck(true);
						}

                        console.log(valid);
						setToken((event.target as HTMLInputElement).value);
					}}
					value={token}
					className="w-2/3 my-2"
				/>
				<Button disabled={!tokenCheck} onClick={addToken}>
					Add
				</Button>
				<ToastContainer />
			</div>
		</div>
	);
}

/* SETTING */

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@/components/ui/dialog";
import { MdDelete } from "react-icons/md";

export function Setting(props: { children: React.ReactNode; data: Tokens; setData: (data: Tokens) => void }) {
	return (
		<Dialog>
			<DialogTrigger asChild>{props.children}</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Settings</DialogTitle>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<Button
						className="inline-flex justify-center items-center"
						onClick={() => {
							const password = Math.random().toString(36).substring(2, 5);
							const answer =
								prompt(
									`"${password}"を入力することで、Tokenは完全に削除されます。\n よろしければ入力して下さい。`
								) ?? "fail";
							if (password !== answer) {
								toast.error("文字列が違うか、入力されていません。");
							} else {
								LS.remove("tokens");
								props.setData([]);
								toast.success("削除成功");
							}
						}}>
						<MdDelete className="transform scale-150 mr-2" /> Clear All Token
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
