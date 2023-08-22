import { useRouter } from "next/router";
import useStore from "src/store/store";

import style from "../styles/Inicio.module.css";
import boton from "../styles/Botones.module.css";

export default function Home() { 
  const { isAuthenticated } = useStore();
  const router = useRouter();

  function redirigir() {
    if(isAuthenticated){
      router.push("/solicitar-turno/servicio");
    } else {
      router.push("/iniciar-sesion");
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