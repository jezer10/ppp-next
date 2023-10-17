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

    const { user } = data as {expires : any, user : any};
  
    const {user : user_data, roles} = user.info

    return {user_data, roles}
}