"use client";
import { useState } from "react"
import { Tokens } from "@/types/data"
import { LS } from "@/lib/ls"

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
        <div>
            
        </div>
    )
}