import React from "react";
import { Providers } from "@/store/providers";
import MyApp from "./app";
import "./global.css";


export const metadata = {
  title: "StakePool Dashboard",
  description: "StakePool is a public blockchain infrastructure operator headquartered in Brazil. It offers non-custodial delegation services with high levels of reliability and availability.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <MyApp>{children}</MyApp>
        </Providers>
      </body>
    </html>
  );
}
