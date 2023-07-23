'use client';
import Link from "next/link";
import { useState } from "react";
import style from "../styles/Nav.module.css";

export default function NavCliente() {
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
                        <Link className={style.enlace} href="/solicitar-turno/servicio" onClick={handleActivo}>Nuevo Turno</Link>
                    </li>
                    <li className={style.navListaEnlaces}> 
                        <Link className={style.enlace} href="/historial" onClick={handleActivo}>Historial</Link>
                    </li>
                    <li className={style.navListaEnlaces}>
                        <Link className={style.enlace} href="/perfil" onClick={handleActivo}>Perfil</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}  