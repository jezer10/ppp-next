import { config } from "@/config";

const URL_APIS = config.BACK_URL

export const LoginAuthService = async (login_obj : any) => {
    const api = await fetch(URL_APIS + "/auth/login/", {

        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(login_obj)

    })
    const response = await api.json();
    return response
}

export const AccessAuthService = async (rol : any) => {
    const api = await fetch(URL_APIS + "/rol/" + rol)
    const response = await api.json();
    return response
}