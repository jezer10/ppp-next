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
      <div className="grid h-full w-full gap-4   md:grid-cols-2 ">
        {settings_options.map((option) => (
          <Link
            href={option.link}
            key={option.id}
            className="flex h-28 md:h-56 rounded-lg bg-white overflow-hidden shadow hover:shadow-lg"
          >
            <div className="flex h-full w-3/5 items-center  justify-center text-[24px] font-bold">
              {option.title.toUpperCase()}
            </div>

            <div className="h-full w-2/5 bg-[#0F3971] px-4">
              <Image
                src={`/svg/${option.icon}`}
                className="h-full w-full object-contain"
                alt="profile.svg"
                width={0}
                height={0}
              />
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};
