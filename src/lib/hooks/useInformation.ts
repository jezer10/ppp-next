import { useSession } from "next-auth/react";

export const useInformation = () => {
    const { data } = useSession();

    const { user } = data as {expires : any, user : any};
  
    const {user : user_data, roles} = user.info

    return {user_data, roles}
}