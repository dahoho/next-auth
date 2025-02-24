import { MantineProvider } from "@mantine/core";
import React, { ReactNode } from "react";

export const AppMantineProvider = ({ children }: { children: ReactNode }) => {
  return <MantineProvider>{children}</MantineProvider>;
};
