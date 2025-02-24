// リクエストが完了する前の中間的な処理を行うためのファイル
export { auth as middleware } from "@/lib/auth";

export const config = {
  // ミドルウェアを適用するパス
  matcher: ["/dashboard/:path*", "/"],
};
