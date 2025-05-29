import { connect } from "../../../dbconfig/dbconfig"
import jwt from 'jsonwebtoken'
import User from '../../../../models/usermodels';

import {NextRequest,NextResponse} from "next/server"
import bcryptjs from "bcryptjs"
export async function POST(request: NextRequest){
    try{
        await connect()

    const bodyText = await request.text();
    console.log("📨 Raw request body:", bodyText);
     const {email,password} =  JSON.parse(bodyText)
     console.log(email,password)
    const user = await User.findOne({email})
     console.log(email,user)
    if(!user){
        return NextResponse.json({error: "User does not exist"},{status:400})
    }
     console.log(email,user)
    const validpassword = await bcryptjs.compare(password,user.password)
    console.log("Valid password:", validpassword)
    if(!validpassword){
        return NextResponse.json({error:"Entered Password is invalid "},{status:400})
    }
    const tokendata = {
        id:user.id,
        username:user.username,
        email:user.email
    }
    const token =  jwt.sign(tokendata,process.env.TOKEN_SECRET!,{expiresIn:"1h"})
    const response = NextResponse.json(
        {
            message: "Login successfull",
            success:true

        })
        response.cookies.set("token",token,{
            httpOnly:true,
            path: "/"
        })
    return response
    }
    catch (error: unknown) {
  let message = 'Internal Server Error';

  if (error instanceof Error) {
    message = error.message;
  }

  return NextResponse.json({ error: message }, { status: 500 });
}

}