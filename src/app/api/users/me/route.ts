import {getdatafromtoken} from '../../../../helpers/getdatafromtoken';
import {NextRequest,NextResponse} from 'next/server'
import { connect } from "../../../dbconfig/dbconfig"
import User from '../../../../models/usermodels';
connect()
export async function GET(request:NextRequest){
    try{
        const userID = await getdatafromtoken(request)
       const user =  await User.findById(userID).select("-password")
       return NextResponse.json({
        message:"user found",
        data:user
       })
        
    }catch(error:any){
        return NextResponse.json({error:error.message},{status:400})

    }
}
    

