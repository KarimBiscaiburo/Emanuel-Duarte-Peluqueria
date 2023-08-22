'use client';
import Link from "next/link";
import style from "../styles/Nav.module.css";

import { useState } from "react";
import { useRouter } from "next/router";

export default function NavInicio() {
    const [activo, setActivo] = useState(false);
    const router = useRouter();
    const handleActivo = () => setActivo(!activo);
    function redirigir() {
        setActivo(!activo);
        router.push("/iniciar-sesion");
    }
    
    const claseHamburguesa = `${style.menuHamburguesa} ${activo ? style.activo : ""}`;
    const claseNav = `${style.nav} ${activo ? style.activo : ""}`;

    return(
        <header className={style.header}>
            <Link className={style.logo} href="/">EMANUEL DUARTE</Link>

            <div id="menu-hamburguesa" className={claseHamburguesa} onClick={handleActivo}>
                <span className={`${style.barra} ${style.uno}`}></span>
                <span className={`${style.barra} ${style.dos}`}></span>
                <span className={`${style.barra} ${style.tres}`}></span>
            </div>

            <nav id="nav" className={claseNav}>
                <ul className={style.navLista}>
                    <li className={style.navListaEnlaces}>
                        <button className={style.enlace} onClick={redirigir}>Iniciar Sesión</button>
                    </li>
                </ul>
            </nav>
        </header>
    );
}  