import { LoginAuthService } from "@/services";
import { log } from "console";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// const loginService = new LoginDatasourseImp();
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        USR_USERNAME: {
          label: "Username",
          type: "text",
          placeholder: "Username",
        },
        USR_PASSWORD: { label: "Password", type: "password" },
      },
      async authorize(credentials, { body }) {
        const { username, password } = body!;
        const login = await LoginAuthService({
          username,
          password,
        });
        if (login.status !== 200) {
          throw new Error(`${login.message}`);
        }
        return login;
      },
    }),
  ],

  callbacks: {
    jwt({ token, user, account }) {
      if (user) token.user = user;
      return token;
    },
    session({ session, token }) {
      if (token) session.user = token.user as any;
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
});

export { handler as GET, handler as POST };
