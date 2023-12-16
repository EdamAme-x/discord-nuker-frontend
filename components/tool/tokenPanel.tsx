import { Tokens } from "@/types/data";
import { LS } from "@/lib/ls";
import { MultiSelect } from "@/components/ui/multi-select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import { useState } from "react";
import { isToken } from "@/lib/isToken";

export function TokenPanel(props: { data: Tokens; setData: (data: Tokens) => void }) {
	const [token, setToken] = useState<string>("");
	const [tokenCheck, setTokenCheck] = useState<boolean>(false);

	return (
		<div className="max-w-[370px]">
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
                        console.log(valid)
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
                <Button disabled={!tokenCheck}>
                    Add
                </Button>
			</div>
		</div>
	);
}
