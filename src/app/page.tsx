"use client";
import Image from "next/image";
import log_sis from "@/../public/logo_sistemas.png";
import log_adv from "@/../public/logo_adventista.png";
import log_grp from "@/../public/group.svg";
import {
  UserIcon,
  CheckIcon,
  XMarkIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/solid";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { getSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

const Home = () => {
  const [visible, setVisible] = useState(false);
  const router = useRouter();
  const [form, setForm] = useState({
    username: "kevinapps",
    password: "12345678",
  });

  function isValid(): boolean {
    const { username } = form;
    if (username.length < 5) {
      return false;
    }
    return true;
  }
  function changeForm(e: React.ChangeEvent<HTMLInputElement>) {
    let name = e.target.name;
    let value = e.target.value;

    setForm({
      ...form,
      [name]: value,
    });
  }

  async function loginAction(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { username, password } = form;

    const signInResponse = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });
    if (signInResponse?.error) {
      return toast.error(signInResponse.error);
    }
    toast.success("Inicio de Sesión Exitoso");
    router.push("/dashboard");
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className=" h-screen overflow-hidden   px-16">
        <div className="absolute inset-0 -z-20 h-full bg-gradient-to-r from-[#0F3971] to-white"></div>
        <Image
          src={log_grp}
          alt="logo grupal"
          priority={true}
          className="absolute right-28 -z-10 h-full w-auto"
        />
        <div className="flex gap-4">
          <div className="h-full w-56">
            <div className="px-12 py-8">
              <Image
                src={log_sis}
                alt="logo sistemas"
                className="h-12 w-auto object-contain"
              />
            </div>
            <div className="flex flex-col gap-32">
              <div className="relative">
                <div className="h-72 w-full rounded-br-[50px] rounded-tl-[50px] bg-[#DFDFDF]"></div>
                <div className="flag absolute top-6 h-72 w-full rounded-br-[50px]"></div>
              </div>
              <div className="h-72 w-full rounded-br-[50px] rounded-tr-[50px] bg-[#FFAB74]"></div>
            </div>
          </div>
          <div className="h-full w-56">
            <div className="flex flex-col gap-4">
              <div className="h-72 w-full -translate-y-1/2 rounded-br-[50px] rounded-tl-[50px] bg-[#DFDFDF] bg-opacity-50"></div>
              <div className="relative">
                <div className="relative h-72 w-full -translate-y-1/2 overflow-hidden rounded-tr-[50px]">
                  <div className="logo_flag absolute -bottom-32 aspect-square w-full rounded-full"></div>
                </div>
                <div className="absolute bottom-4 aspect-square w-full p-4">
                  <div className="h-full w-full rounded-full bg-[#DCDCDC] p-4">
                    <div className="h-full w-full rounded-full bg-[#E7E7E7] p-4">
                      <div className="flex h-full w-full items-center justify-center rounded-full bg-white p-10">
                        <Image
                          src={log_adv}
                          alt="logo adventista"
                          className="h-full w-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 right-0 top-0 flex h-full w-1/2 items-center justify-center">
          <div className="flex max-w-xs flex-col gap-4">
            <div className="text-center  text-[#0F3971] ">
              <div className="text-2xl font-bold">Iniciar Sesión</div>
              <div className="text-sm font-light">
                Bienvenido al panel de control de Practicas Pre Profesionales,
                ingresa tus credenciales para continuar
              </div>
            </div>
            <form onSubmit={loginAction}>
              <div className="flex flex-col gap-4">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    className="w-full rounded-lg border px-4 py-3 pr-10 placeholder:text-sm placeholder:text-[#83878D]  focus:border-cyan-100 focus:outline-none"
                    placeholder="Usuario"
                    name="username"
                    value={form.username}
                    onChange={changeForm}
                  />
                  <div className="absolute right-2 h-6 w-6 text-[#83878D]">
                    <div className="relative">
                      <UserIcon />

                      <div
                        className={`absolute bottom-0 right-0 h-3 w-3 rounded-full bg-white ${
                          isValid() ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {isValid() ? <CheckIcon /> : <XMarkIcon />}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative flex items-center">
                  <input
                    type={visible ? "text" : "password"}
                    className="w-full rounded-lg border px-4 py-3 pr-10 placeholder:text-sm placeholder:text-[#83878D]  focus:border-cyan-100 focus:outline-none"
                    placeholder="Contraseña"
                    name="password"
                    value={form.password}
                    onChange={changeForm}
                  />
                  <div className="absolute right-2 h-6 w-6 text-[#83878D]">
                    <div
                      className="relative cursor-pointer hover:text-[#0F3971]"
                      onClick={() => setVisible(!visible)}
                    >
                      {visible ? <EyeSlashIcon /> : <EyeIcon />}
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="rounded-lg bg-[#0F3971] py-3 text-white"
                >
                  Ingresar
                </button>
              </div>
            </form>

            <div className="px-4 text-center text-sm font-light text-[#0F3971]">
              <p>
                Si tiene problemas con sus credenciales pongase en contacto con{" "}
                <span className="font-bold">soporte</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
