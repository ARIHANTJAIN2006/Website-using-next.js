import { connect } from "../../../dbconfig/dbconfig"
import User from "../../../../models/usermodels"
import {NextRequest,NextResponse} from "next/server"


export async function POST(request:NextRequest){
    try{
        await connect()
        const reqBody = await request.json()
        const {token} = reqBody
        const user = await User.findOne({forgotpasswordToken:token,
            forgotpasswordTokenexpiry:{$gt: new Date()}})
            if(!user){
                
                return NextResponse.json({error:"Invalid Token or Token missing"},{
                    status:400
                })
            }
            const email = user.email
            user.forgotpasswordToken = undefined
            user.forgotpasswordTokenexpiry = undefined
            await user.save()
            return NextResponse.json({message:"youcanresetpass",
               success:true,email
    })
        }
    catch(error:unknown){
        if (error instanceof Error) {
    return NextResponse.json({ error: error.message });
  }
  return NextResponse.json({ error: 'Unknown error occurred' });
    }
}