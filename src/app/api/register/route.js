import dbConnect from "@/utils/dbConnect";
import userModel from "../../../models/userModel";
import {NextResponse} from "next/server";
import bcrypt from "bcrypt"
import User from "../../../models/userModel";

export async function POST(req){
    try{
        await dbConnect();

        const {username, email, firstname, lastname, college, phone, birthday ,password} = await req.json();
        const exists = await User.findOne({$or:[{email},{username}]});
        if(exists){
            return  NextResponse.json({message: "Username or email already exists"},
            { status: 500}
            )
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({firstname, lastname, college, phone, birthday ,username, email, password:hashedPassword})
        
        // console.log({username, email, firstname, lastname, college, phone, birthday ,password});
        return NextResponse.json({message: "User registered"}, { status: 201});
    } catch(error){
        console.log("Error while registering user.", error);
        return NextResponse.json({message: "Error Occured while registering the user"}, {status:500})
    }
}