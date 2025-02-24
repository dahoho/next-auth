// リクエストが完了する前に、リクエストに対して何らかの処理を行う
import { auth } from "@/lib/auth";
import type { NextRequest } from "next/server";

export default auth(async (req: NextRequest) => {
  // セッション情報を取得
  // const session = await auth();
});

export const config = {
  // ミドルウェアを適用するパス
  matcher: ["/dashboard/:path*", "/login"],
};
