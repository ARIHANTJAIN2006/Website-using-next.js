import {getdatafromtoken} from '../../../../helpers/getdatafromtoken';
import {NextRequest,NextResponse} from 'next/server'
import { connect } from "../../../dbconfig/dbconfig"
import User from '../../../../models/usermodels';

export async function GET(request:NextRequest){
    try{
      await connect()
        const userID = await getdatafromtoken(request)
       const user =  await User.findById(userID).select("-password")
       return NextResponse.json({
        message:"user found",
        data:user
       })
        
    }catch (error: unknown) {
  let message = 'Internal Server Error';

  if (error instanceof Error) {
    message = error.message;
  }

  return NextResponse.json({ error: message }, { status: 500 });
}

}
    

