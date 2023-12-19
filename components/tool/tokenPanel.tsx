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
	const [tokenCheck, setTokenCheck] = useState<boolean>(false); // 厳格な管理の為に敢えてuseState

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
					const result = props.data.filter(d => d.token !== e);
					props.setData(result);
					LS.set("tokens", result);
				}}
				className="w-[340px]"
				suppressHydrationWarning={true}
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
import { FaCheckCircle } from "react-icons/fa";
import { isWorks } from "@/lib/isWorks";

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
					<DialogTemplate
						className="inline-flex justify-center items-center"
						button={
							<>
								<FaCheckCircle className="transform scale-[1.2] mr-3" /> 生存確認
							</>
						}
						title={"生存確認"}>
						<Label className="text-center">Tokenの生存確認を行えます。</Label>
						<OneToken />
						{/* <MultiToken /> */}
						{/* <PanelToken /> */}
					</DialogTemplate>
				</div>
			</DialogContent>
		</Dialog>
	);
}

function OneToken() {
	const [oneToken, setOneToken] = useState<string>("");
	let [result, setResult] = useState<"" | "生存" | "死亡">("");

	return (
		<DialogTemplate
			className="inline-flex justify-center items-center"
			button={
				<>
					<FaCheckCircle className="transform scale-[1.2] mr-3" /> 単体のTokenを生存確認
				</>
			}
			title={"単体生存確認"}>
			<Input
				placeholder="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.XXXXXXXXXX.XXXXXXXXXXXXXXXXXXXXXXX"
				value={oneToken}
				onChange={e => setOneToken(e.target.value)}
			/>
			<Button
				onClick={async () => {
					const valid = isToken(oneToken);

					if (valid) {
						if (await isWorks(oneToken)) {
							toast.success("Tokenは使用可能です。");
							setResult("生存");
						} else {
							toast.warn("Tokenは使用不可能である可能性が高いです。");
							setResult("死亡");
						}
					} else {
						toast.error("Tokenの形式が正しくありません。");
					}
				}}>
				確認
			</Button>
			{result !== "" && (
				<Label className="text-center">
					{result === "生存" ? (
						<p>Tokenは使用可能です。</p>
					) : (
						<>
							<p>Tokenは使用不可である可能性が高いです。</p>
							<p>注意: パスワードを変更するとTokenも変わります。</p>
						</>
					)}
				</Label>
			)}
		</DialogTemplate>
	);
}

export function DialogTemplate(props: {
	title: string;
	button: React.ReactNode;
	className: string;
	children: React.ReactNode;
}) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline" className={props.className}>
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
