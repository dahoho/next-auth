"use client";

import { signIn } from "next-auth/react";
import GithubIcon from "../icon/GithubIcon";
import GoogleIcon from "../icon/GoogleIcon";
import { useState } from "react";
import { Button, Divider, Loader, TextInput } from "@mantine/core";
import { SubmitHandler, useForm } from "react-hook-form";
import { IconAt } from "@tabler/icons-react";

type Inputs = {
  email: string;
};

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    await signIn("email", {
      email: data.email,
      callbackUrl: `/dashboard`,
    });
  };

  const [isGithubLoading, setIsGithubLoading] = useState<boolean>(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);

  const handleGitHubSignIn = () => {
    signIn("github", { callbackUrl: `/dashboard` });
  };

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: `/dashboard` });
  };

  const icon = <IconAt size={16} />;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-5"
    >
      <div className="md:max-w-sm mx-auto">
        <h1 className="text-lg font-bold text-center">Welcome back</h1>
        <div className="flex flex-col gap-4 mt-4">
          <TextInput
            leftSectionPointerEvents="none"
            leftSection={icon}
            placeholder="メールアドレス"
            {...register("email", { required: true })}
          />
          <Button type="submit" color="rgba(0, 0, 0, 1)" fullWidth>
            メールアドレスでログイン
          </Button>
        </div>
        <Divider my="lg" label="または" labelPosition="center" />
        <div className="flex flex-col gap-4">
          <button
            className="rounded-md border border-gray-300 py-2 flex items-center justify-center"
            type="button"
            onClick={() => {
              setIsGithubLoading(true);
              handleGitHubSignIn();
            }}
          >
            <div className="flex items-center gap-2">
              {isGithubLoading ? (
                <Loader color="gray" size="sm" />
              ) : (
                <GithubIcon size="24" />
              )}
              <span>Gihub</span>
            </div>
          </button>
          <button
            className="rounded-md border border-gray-300 py-2 flex items-center justify-center"
            type="button"
            onClick={() => {
              setIsGoogleLoading(true);
              handleGoogleSignIn();
            }}
          >
            <div className="flex items-center gap-2">
              {isGoogleLoading ? (
                <Loader color="gray" size="sm" />
              ) : (
                <GoogleIcon size="24" />
              )}
              <span>Google</span>
            </div>
          </button>
        </div>
      </div>
    </form>
  );
};
