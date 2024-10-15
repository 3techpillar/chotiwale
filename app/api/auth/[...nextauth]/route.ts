import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { dbConnect } from "@/libs/dbConnect";
import User from "@/models/User.modal";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "user-login",
      name: "User Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect();

        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          throw new Error("No user found with this email");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        } else {
          return {
            id: user._id.toString(),
            email: user.email,
            username: user.username,
          };
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token._id = user.id;
        token.email = user.email;
        token.username = user.username;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user._id = token._id;
        session.user.email = token.email;
        session.user.username = token.username;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
