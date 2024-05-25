"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React, { useEffect } from "react";
import store from "@/store";
import { Provider } from "react-redux";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    console.log("layout init");
  }, []);
  return (
    <Provider store={store}>
      <html lang="en">
        <body>
          <AntdRegistry>{children}</AntdRegistry>
        </body>
      </html>
    </Provider>
  );
}
