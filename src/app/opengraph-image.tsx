import { ImageResponse } from "next/server";
export const contentType = "image/png";
export const runtime = "edge";
export const alt = "Upeu 2023";
export const size = {
  width: 1200,
  height: 630,
};
// const inter = fetch(new URL("../../public/Inter-Variable.ttf", import.meta.url)).then(
//   (res) => res.arrayBuffer(),
// );

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(90deg, #000 0%, #222 100%)",
        }}
        tw={`flex h-full w-full items-center justify-center text-white text-[128px]`}
      >
        UPEU 2023
      </div>
    ),
    {
      ...size,

    },
  );
}
