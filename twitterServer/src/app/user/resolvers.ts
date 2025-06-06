import axios from "axios";
import { prismaClient } from "../..";
import {JWTService} from "../services/jwt"

interface GoogleTokenResult {
  iss?: string;
  azp?: string;
  aud?: string;
  sub?: string; // Assuming sub is a string (ID)
  email: string;
  email_verified: "true" | "false"; // Based on the value being 'true'
  nbf?: string; // If this is a timestamp, you may want to consider 'number'
  name?: string;
  picture?: string;
  given_name: string;
  family_name?: string;
  iat?: string; // Similarly, this might be a 'number' if it's a timestamp
  exp?: string; // Same for 'exp', could be a 'number' for timestamp
  jti?: string;
  alg?: string;
  kid?: string;
  typ?: string;
}

const queries = {
  verifyGoogleToken: async (parent: any, { token }: { token: string }) => {
    const googleAuthBaseUrl = new URL(
      "https://oauth2.googleapis.com/tokeninfo"
    );
    googleAuthBaseUrl.searchParams.set("id_token", token);

    const { data } = await axios.get<GoogleTokenResult>(
      googleAuthBaseUrl.toString(),
      {
        responseType: "json",
      }
    );

    const user = await prismaClient.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
       await prismaClient.user.create({
        data: {
          email: data.email,
          firstName: data.given_name,
          lastName: data.family_name,
          profileImageUrl: data.picture || "",
        },
      });
    }
    const userInDb = await prismaClient.user.findUnique({ where: { email:data.email} }); //again queried because if users don't exist , then now we created it and again querying the db
    if(!userInDb){
      throw new Error("User not found")
    }
    const newToken =  JWTService.generateTokenForUser(userInDb)

    console.log(data);
    console.log(newToken)
    return newToken;
  },
};

export const resolvers = { queries };
