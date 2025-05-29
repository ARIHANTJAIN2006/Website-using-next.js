import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { connect } from "../app/dbconfig/dbconfig";

// Define the expected payload structure of the JWT
interface JwtPayload {
  id: string;
  // add more fields here if your token includes them
}

export const getdatafromtoken = async (request: NextRequest): Promise<string> => {
  await connect();

  try {
    const token = request.cookies.get("token")?.value || '';

    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as JwtPayload;

    return decodedToken.id;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Unknown error occurred");
    }
  }
};
