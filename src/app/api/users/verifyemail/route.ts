import { connect } from "../../../dbconfig/dbconfig"
import User from "../../../../models/usermodels"
import {NextRequest,NextResponse} from "next/server"


export async function POST(request:NextRequest){
    try{
      await connect()
        const reqBody = await request.json()
        const {token} = reqBody
        const user = await User.findOne({
  verifyToken: token,
  verifyTokenExpiry: { $gt: new Date() },
})
            if(!user){
                return NextResponse.json({error:"Invalid Token"},{
                    status:400
                })
            }
            console.log(user)
            user.isVerified = true
            user.verifyToken = undefined
            user.verifyTokenExpiry = undefined
            await user.save()
            return NextResponse.json({message:"Email verified",
               success:true
    })
        }
    catch (error: unknown) {
  let message = 'Internal Server Error';

  if (error instanceof Error) {
    message = error.message;
  }

  return NextResponse.json({ error: message }, { status: 500 });
}

}