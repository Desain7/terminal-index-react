"use client";
import MyTerminal from "@/components/MyTerminal/MyTerminal";
import { Fragment, useEffect } from "react";

export default function Home() {
  useEffect(() => {
    console.log("home init");
  }, []);
  return (
    <Fragment>
      {" "}
      <MyTerminal fullScreen={true}></MyTerminal>
      <div className="fixed bottom-2 right-2">
        <a
          href="https://beian.miit.gov.cn/"
          className="text-blue-600 cursor-pointer transition-colors duration-300"
          target="_blank"
        >
          赣ICP备2022002254号-2
        </a>
      </div>
    </Fragment>
  );
}
