"use client"

import { SessionProvider } from "next-auth/react";
import Footer from "./Footer";
import Navegacion from "src/components/Navegacion";

export default function Layout({ children }) {
  return (
    <SessionProvider>
      <Navegacion />
      {children}
      <Footer />
    </SessionProvider>
  )
}