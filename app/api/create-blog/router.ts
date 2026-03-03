import { NextResponse } from "next/server";
import { success } from "zod";

export async function POST(){
    console.log("hello from the server ");

    return NextResponse.json({success:true})
}

/// this are route handler