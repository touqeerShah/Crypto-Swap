// import './globals.css'

import React from "react";
import { useRouter } from "next/router";

export default function RootLayout({ children }) {
  const router = useRouter();

  return (
    <>
      <div className="relative md:ml-64 mx-auto	  bg-themeColor-800">
        <nav className={"nav"}>
          <div className="topnav">
            <a className={router.pathname == "/" ? "active" : ""} href="#home">
              Whitelist
            </a>
            <a
              className={router.pathname == "/nft" ? "active" : ""}
              href="/nft"
            >
              NFT
            </a>
            <a
              className={router.pathname == "/token" ? "active" : ""}
              href="/token"
            >
              Token
            </a>
            <a
              className={router.pathname == "/dao" ? "active" : ""}
              href="/dao"
            >
              DAO
            </a>
            <a
              className={router.pathname == "/swap" ? "active" : ""}
              href="/swap"
            >
              Token Swap
            </a>
          </div>
        </nav>
        <div className="px-4 md:px-10 mx-auto w-full -m-24">{children}</div>
        <footer className={"footer"}>Made with &#10084; by TK Devs</footer>
      </div>
    </>
  );
}
