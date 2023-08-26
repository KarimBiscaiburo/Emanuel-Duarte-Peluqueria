import style from "../styles/Inicio.module.css";
import boton from "../styles/Botones.module.css";
import Link from "next/link";

export default function Home() { 
  return (
    <>
      <main>
        <div className="contenedor alinear-medio">
          <h1>Estilista y Barbero</h1>
        </div>

        <div className={style.imagenes}>
            
        </div>
          
        <div className="contenedor alinear-medio">
            <Link href={"/solicitar-turno/servicio"} className={boton.verde}>Solicitar Turno</Link>
        </div>
      </main>
    </>
  )
}