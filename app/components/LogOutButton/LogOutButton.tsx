"use client";

import { Button } from "@mantine/core";
import { signOut } from "next-auth/react";

export const LogOutButton = () => {
  return (
    <Button
      variant="filled"
      size="sm"
      color="rgba(0, 0, 0, 1)"
      onClick={() => signOut({ callbackUrl: `/` })}
    >
      ログアウト
    </Button>
  );
};
