import { FC } from 'react'
import * as HIcons from '@heroicons/react/20/solid';

const DynamicHeroIcon: FC<{icon: string}> = (props) => {
  const {...icons} = HIcons
  // @ts-ignore
  const TheIcon: JSX.Element = icons[props.icon]

  return (
    <>
      {/* @ts-ignore */}
      <TheIcon className="h-4 w-4" aria-hidden="true" />
    </>
  )
}

export default DynamicHeroIcon