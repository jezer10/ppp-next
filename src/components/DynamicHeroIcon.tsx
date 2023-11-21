import { FC } from "react";
import * as HeroIcons from "@heroicons/react/24/solid";
import { DocumentIcon } from "@heroicons/react/24/outline";
interface IconProps {
  icon: string;
}

const DynamicHeroIcon: FC<IconProps> = (props) => {
  const { [props.icon]: HeroIcon } = HeroIcons as {
    [key: string]: React.ForwardRefExoticComponent<
      React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & {
        title?: string;
        titleId?: string;
      } & React.RefAttributes<SVGSVGElement>
    >;
  };
  return (
    <>
      {(HeroIcon && <HeroIcon className="h-4 w-4" aria-hidden="true" />) ?? (
        <DocumentIcon className="h-4 w-4" />
      )}
    </>
  );
};

export default DynamicHeroIcon;
