import Footer from "./Footer";
import Navegacion from "@/components/Navegacion";

export default function Layout({ children }) {
  return (
    <>
      <Navegacion />
      {children}
      <Footer />
    </>
  )
}