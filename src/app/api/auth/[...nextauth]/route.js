import User from "@/models/userModel";
import dbConnect from "@/utils/dbConnect";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt"

  async function login(credentials){
    try{
        dbConnect();
        const user = await User.findOne({username: credentials.username})
        if(!user) throw new Error("Wrong Credentials.")
        const isCorrect = await bcrypt.compare(credentials.password, user.password);
        if(!isCorrect) throw new Error("Wrong Credentials.");
        return user;
    } catch(error){
        console.log("error while logging in.");
        throw new Error("Something went wrong ")
    }
  }
  
  export const authOptions = {
    pages:{
        signIn: "/login"
    },
    providers: [
        CredentialsProvider({
          name: "credentials",
    
          credentials: { },
          async authorize(credentials){
            try{
                const user = await login(credentials);
                // console.log("this is the user=", user);
                return user;
            } catch(error){
                // console.log("Error =", error);
                // return null;
                throw new Error("Failed to login.")
            }
          }
    
        })
      ],
      callbacks:{
        async jwt({token, user}){
            if(user){
                token.username = user.username;
                token.email = user.email;
                token.id = user.id;
            }
            console.log("this is the token=",token);
            return token;
        },
        async session({session, token}){
            if(token){
                session.user.username = token.username;
                session.user.email = token.email;
                session.user.id = token.id;
            }
            console.log("this is the session=", session );
            return session;
        }
      }
  }
  const handler = NextAuth(authOptions);

  export { handler as GET, handler as POST}