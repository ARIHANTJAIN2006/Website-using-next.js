import { connect } from "../../../dbconfig/dbconfig"
import User from '../../../../models/usermodels';
import bcrypt from 'bcryptjs'

import {NextRequest,NextResponse} from "next/server"

export async function POST(request:NextRequest){
    try{
    await connect()
    const {newpassword,email} = await request.json()
    console.log(email,newpassword)
    const user = await User.findOne({email})
      const hashedPassword = await bcrypt.hash(newpassword, 10);
      user.password = hashedPassword;
  await user.save();
          return NextResponse.json({message:"Password",success:true},{status:200})
    }catch (error: unknown) {
  let message = 'Internal Server Error';

  if (error instanceof Error) {
    message = error.message;
  }

  return NextResponse.json({ error: message }, { status: 500 });
}

}