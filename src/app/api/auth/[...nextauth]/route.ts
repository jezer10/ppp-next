import { LoginAuthService } from "@/services";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// const loginService = new LoginDatasourseImp();
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "jsmith",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        const { username, password } = credentials!;
        const response = await LoginAuthService({
          username,
          password,
        });
        if (response.status !== 200) {
          throw new Error(`${response.message}`);
        }
        return response.data;
      },
    }),
  ],

  callbacks: {
    jwt({ token, user }) {
      if (user) {
        return {
          user,
        };
      }
      return token;
    },
    session({ session, token, user }) {
      if (token) {
        return {
          ...session,
          user: token.user as any,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
});

export { handler as GET, handler as POST };
