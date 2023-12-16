"use client";
import { useState } from "react"
import { Tokens } from "@/types/data"
import { LS } from "@/lib/ls"
import { Button } from "../ui/button";
import { TokenPanel } from "./tokenPanel";
import { Label } from "../ui/label"

export function Tool() {
    const [data, setData] = useState<Tokens>(() => {
        if (typeof window !== "undefined") {
            if (LS.get("tokens")) {
                return JSON.parse(LS.get("tokens") as string)
            }else {
                LS.set("tokens", [])
                return []
            }
        }else {
            return [];
        }
    })

    return (
        <div className="w-screen flex flex-col justify-center items-center">
            <TokenPanel data={data} setData={setData} />
            {
                data.length <= 0 && <div className="h-[50vh] flex flex-col justify-center items-center">
                    <Label>TOKEN が追加されていません！</Label>
                </div>
            }
        </div>
    )
}