import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import { prisma } from "./prisma.ts";

export const config: NextAuthConfig = {
  // ユーザーの情報をデータベースに保存するためのアダプターを指定
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  basePath: "/api/auth",
  // 認証が完了したの動作
  callbacks: {
    authorized({ request, auth }) {
      try {
        const isAuth = !!auth;
        const { pathname } = request.nextUrl;

        // 認証が完了していない場合、ダッシュボードにアクセスできないようにする
        // if (pathname === "/dashboard") return isAuth;
        // デフォルトでは認証が完了していなくても、認証が完了しているとみなされる
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    // 認証が成功すると、jwtトークンが生成される
    jwt({ token, trigger, session }) {
      if (trigger === "update") token.name = session.user.name;
      return token;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);
