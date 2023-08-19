import { useRouter } from "next/router";
import useStore from "src/store/store";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

import style from "../styles/Inicio.module.css";
import boton from "../styles/Botones.module.css";

export default function Home() { 
  const { isAuthenticated } = useStore(); 
  const changeIsAdmin = useStore( (state) => state.changeIsAdmin);
  const changeIsAuthenticated = useStore( (state) => state.changeIsAuthenticated);
  const changeIdUsuario = useStore( (state) => state.changeIdUsuario);
  const router = useRouter();
  const { data } = useSession();
  console.log(data)

  // useEffect(() => {
  //   if(data?.user === "admin") {
  //     changeIsAdmin();
  //     changeIsAuthenticated();
  //   } else if (data?.user) {
  //     changeIsAuthenticated();
  //     changeIdUsuario(data.user);
  //   }
    
  // }, [data, changeIsAdmin, changeIsAuthenticated, changeIdUsuario])

  function redirigir() {
    if(isAuthenticated){
      router.push("/solicitar-turno/servicio");
    } else {
      router.push("/api/auth/signin");
    }
  }

  return (
    <>
      <main>
        <div className="contenedor alinear-medio">
          <h1>Estilista y Barbero</h1>
        </div>

        <div className={style.imagenes}>
            
        </div>
          
        <div className="contenedor alinear-medio">
            <button onClick={redirigir} className={boton.verde}>Solicitar Turno</button>
        </div>
      </main>
    </>
  )
}