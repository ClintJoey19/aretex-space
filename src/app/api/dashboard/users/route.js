import { User } from "@/lib/models";
import { connect } from "@/lib/connection";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        connect()

        const users = await User.find()
        return NextResponse.json(users)
    } catch (err) {
        console.log(err.message);
        throw new Error("Failed to fetch users")
    }
}