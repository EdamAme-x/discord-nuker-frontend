import { Tokens } from "@/types/data";
import { LS } from "@/lib/ls";
import { MultiSelect } from "@/components/ui/multi-select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import { useState } from "react";
import { isToken } from "@/lib/isToken";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function TokenPanel(props: { data: Tokens; setData: (data: Tokens) => void }) {
	const [token, setToken] = useState<string>("");
	const [tokenCheck, setTokenCheck] = useState<boolean>(false);

    const addToken = () => {
        if (props.data.find(i => i.token === token)) {
            toast.error('既に存在します!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: !document.querySelector("body[class='dark']") ? "light" : "dark",
            });
            return;
        }

        props.setData([...props.data, {
            token: token,
            isEnabled: true
        }])
        LS.set("tokens", [...props.data, {
            token: token,
            isEnabled: true
        }])
    }

	return (
		<div className="max-w-[370px] flex flex-col justify-center items-center">
			<p className="text-xl font-bold w-full inline-flex justify-center my-3">TokenPanel</p>
			<MultiSelect
				options={props.data.map(i => {
					return {
						value: i.token,
						label: i.token
					};
				})}
				selected={props.data.map(i => i.token)}
				onChange={() => {}}
			/>
			<div className="w-full flex justify-around items-center">
				<Input
					type="text"
					placeholder="Token"
                    // @ts-ignore NOTE: LIB SIDE ERROR
					onChange={(event: InputEvent) => {
						const valid = isToken((event.target as HTMLInputElement).value);
                        if (!valid) {
                            setTokenCheck(false)
                        }else {
                            setTokenCheck(true)
                        }

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
