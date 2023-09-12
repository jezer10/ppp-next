import { ImageResponse } from "next/server";
export const size = {
  width: 32,
  height: 32,
};
export default function Icon() {
  return new ImageResponse(
    (
      <div tw="flex items-center justify-center w-full h-full rounded-full  bg-black text-white text-[20px] leading-8">
        A
      </div>
    ),
    {
      ...size,
    },
  );
}
