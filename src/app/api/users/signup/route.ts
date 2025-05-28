import { connect } from "../../../dbconfig/dbconfig"

import User from  "../../../../models/usermodels.js"
import {NextRequest,NextResponse} from "next/server"
import bcryptjs from "bcryptjs"
import {sendEmail} from '../../../../helpers/mailer';

export async function POST(request: NextRequest){
    try{
        console.log("lol")
        await connect();
    const reqbody = await request.json()
    const {username,email,password} = reqbody
    console.log(reqbody)    
    const user = await User.findOne({email})
    if(user){
        return NextResponse.json({error:"User already exists, Go to Login"},{status:400})
    }
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password,salt)
    const newuser = new User({
        username,
        email,
        password:hashedPassword
    })
    const saveduser = await  newuser.save()
    console.log(saveduser)

    //send veririfcation email
    
    await sendEmail({email,emailType:"VERIFY",userId:saveduser._id})
    return NextResponse.json({message: "User created successfully",success:true,saveduser},{status:201})
    }catch(error:any)
    {
        return NextResponse.json({error: error.message},{status:500})
    }
}