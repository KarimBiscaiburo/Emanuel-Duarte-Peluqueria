import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Fechas from "@/components/Fechas";

import boton from "../../styles/Botones.module.css";

export default function Reprogramar() {

    const router = useRouter();
    const direccion = router.query.url;

    return(
        <>
            <Head>
                <title>Emanuel Duarte - Reprogramar</title>
            </Head>

            <Fechas />

            <div className="contenedor alinear-costados">
                <Link href={`/${direccion}`} className={boton.rojo}>Volver</Link>
                <Link href={`/${direccion}`} className={boton.verde}>Confirmar</Link>
            </div>
        </>
    )
}