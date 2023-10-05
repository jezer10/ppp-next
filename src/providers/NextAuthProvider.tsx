"use client";
import { SessionProvider } from "next-auth/react";
interface Props {
  children: React.ReactNode;
}
export const NextAuthProvider = ({ children }: Props) => {
  return (
    <>
      <SessionProvider key={"auth_provider"}>{children}</SessionProvider>
    </>
  );
};
