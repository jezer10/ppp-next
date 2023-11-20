import { useSession } from "next-auth/react";

export const useInformation = () => {
  const { data, status } = useSession();
  if (status === "loading") {
    return { loading: true };
  }

  if (status === "unauthenticated") {
    return { error: "User is not authenticated" };
  }

  if (!data || !data.user) {
    return { error: "Session data is missing or in the wrong format" };
  }

  const {
    user: { roles, ...user } ,
  } = data as any;
  return { user, roles };
};
