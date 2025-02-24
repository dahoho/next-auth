import { Avatar } from "@mantine/core";
import { auth } from "@/lib/auth";
import { LogOutButton } from "@/app/components/LogOutButton/LogOutButton";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  // ユーザーのセッション情報を取得
  const session = await auth();

  // セッションがない場合はログインページにリダイレクト
  if (!session) return redirect("/");

  return (
    <div className="p-10">
      <LogOutButton />
      <div className="flex flex-col gap-3 mt-8">
        {session?.user?.image && (
          <Avatar src={session.user.image} alt={session.user.name ?? ""} />
        )}
        <p>{session?.user?.name ?? "ログインしているユーザー名が入ります。"}</p>
        <p>
          {session?.user?.email ?? "ログインしているメールアドレスが入ります。"}
        </p>
      </div>

      <div className="p-3 bg-gray-100 rounded-md mt-8">
        <pre className="py-6 px-4 whitespace-pre-wrap break-all">
          {JSON.stringify(session, null, 2)}
        </pre>
      </div>
    </div>
  );
}
