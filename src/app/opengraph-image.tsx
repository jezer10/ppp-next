import { ImageResponse } from "next/server";
import { Inter } from "next/font/google";
export const contentType = "image/png";
export const runtime = "edge";
export const alt = "Upeu 2023";
export const size = {
  width: 1200,
  height: 630,
};
const inter = Inter({
  subsets: ["latin"],
});
export default async function Image() {
  return new ImageResponse(
    (
      <div
        className={`${inter.className}`}
        style={{
          fontSize: 128,
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Upeu 2023
      </div>
    ),
    {
      ...size,
    },
  );
}
