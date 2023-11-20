import Image from "next/image";
import "../../styles/settings.css";
import Link from "next/link";
export const ProfileMain = () => {
  let settings_options = [
    {
      id: 1,
      title: "Profile",
      icon: "profile2.svg",
      link: "/dashboard/settings/profile",
    },
    {
      id: 2,
      title: "Usuarios",
      icon: "users.svg",
      link: "/dashboard/settings/users",
    },
    {
      id: 3,
      title: "Roles",
      icon: "role.svg",
      link: "/dashboard/settings/rols",
    },
    {
      id: 4,
      title: "Accesos",
      icon: "access.svg",
      link: "/dashboard/settings/accesss",
    },
  ];
  return (
    <>
      <div className="grid h-[100%] w-[100%] grid-cols-2 gap-4  p-8">
        {settings_options.map((option) => {
          return (
            <Link href={option.link} key={option.id}>
              <div className="card" key={option.id}>
                <div className="flex w-[80%] items-center  justify-center">
                  <p className="text-[24px] font-bold">
                    {option.title.toUpperCase()}
                  </p>
                </div>

                <div className="card__image">
                  <Image
                    src={`/svg/${option.icon}`}
                    className="w-[200px]"
                    width={0}
                    height={0}
                    alt="profile.svg"
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};
