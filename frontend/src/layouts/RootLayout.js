// import './globals.css'

import React from "react";

export default function RootLayout({ children }) {
  return (
    <>
      <div className="relative md:ml-64 mx-auto	  bg-themeColor-800">
        <div className="px-4 md:px-10 mx-auto w-full -m-24">{children}</div>
        <footer className={"footer"}>Made with &#10084; by TK Devs</footer>
      </div>
    </>
  );
}
