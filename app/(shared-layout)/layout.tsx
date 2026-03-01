import { Navbar } from "@/components/web/navbar";
import { ReactNode } from "react";

export default function Shared_Layout({children}:{children:ReactNode}){
    return(
        <>
        <Navbar/>
        {children}
        </>
    )
}