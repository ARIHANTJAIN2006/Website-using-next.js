import { connect } from "../../../dbconfig/dbconfig"
import User from '../../../../models/usermodels';
import {sendEmail} from '../../../../helpers/mailer';

import {NextRequest,NextResponse} from "next/server"


export async function POST(request:NextRequest){
    try{
    await connect()
    const body = await request.text()
    const {email} = JSON.parse(body) 
    const user = await User.findOne({email})
    if(!user){
        return NextResponse.json({error:"User with this email is not registered",},{status:400})
    }
    //send verification email
    await sendEmail({email,emailType:"RESETPASSWORD",userId:user._id})
    return NextResponse.json({message: "User created successfully",success:true,email},{status:201})
}
catch (error: unknown) {
  let message = 'Internal Server Error';

  if (error instanceof Error) {
    message = error.message;
  }

  return NextResponse.json({ error: message }, { status: 500 });
}

}