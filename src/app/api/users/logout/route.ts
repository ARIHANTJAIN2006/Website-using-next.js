import {NextResponse} from "next/server"
export async function GET(){
    try{
        const response = NextResponse.json({message:"Logout successful",
            success:true
        },{status:200})
        response.cookies.set("token","",{
            httpOnly:true,
            expires: new Date(0)
        })
    return response
    }catch (error: unknown) {
  let message = 'Internal Server Error';

  if (error instanceof Error) {
    message = error.message;
  }

  return NextResponse.json({ error: message }, { status: 500 });
}

}