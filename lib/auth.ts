import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthConfig, Session } from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import { prisma } from "./prisma.ts";
import { JWT } from "next-auth/jwt";

export const config: NextAuthConfig = {
  // ユーザーの情報をデータベースに保存するためのアダプターを指定
  adapter: PrismaAdapter(prisma),
  providers: [Google, GitHub],
  basePath: "/api/auth",
  // pages: {
  //   signIn: "/dashboard",
  // },
  // 認証が完了したの動作
  callbacks: {
    authorized({ request, auth }) {
      try {
        // デフォルトでは認証が完了していなくても、認証が完了しているとみなされる
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    // JSON Web Token が作成されたとき（サインイン時など）や更新されたとき（クライアントでセッションにアクセスしたときなど）に呼び出される。ここで返されるものはすべて JWT に保存され，session callbackに転送される。そこで、クライアントに返すべきものを制御できる。それ以外のものは、フロントエンドからは秘匿される。JWTはAUTH_SECRET環境変数によってデフォルトで暗号化される。
    // セッションに何を追加するかを決定するために使用される
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    //セッションがチェックされるたびに呼び出される（useSessionやgetSessionを使用して/api/sessionエンドポイントを呼び出した場合など）。
    // 戻り値はクライアントに公開されるので、ここで返す値には注意が必要！
    // jwt callbackを通してトークンに追加したものをクライアントが利用できるようにしたい場合，ここでも明示的に返す必要がある
    // token引数はjwtセッションストラテジーを使用する場合にのみ利用可能で、user引数はデータベースセッションストラテジーを使用する場合にのみ利用可能
    // JWTに保存されたデータのうち，クライアントに公開したいものを返す
    async session({ session, token }: { session: Session; token: JWT }) {
      console.log("session", token);
      return session;
    },
  },
  // jwtを利用したセッションの管理に切り替える（セッションをDBに保存しないように）
  session: {
    strategy: "jwt",
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);
