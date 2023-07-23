'use client';
import Link from "next/link";
import style from "../styles/Nav.module.css";

import { useState } from "react";

export default function NavInicio() {
    const [activo, setActivo] = useState(false);
    const handleActivo = () => setActivo(!activo);
    
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
                        <Link className={style.enlace} href="/iniciar-sesion" onClick={handleActivo}>Iniciar Sesión</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}  