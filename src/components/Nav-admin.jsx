'use client';
import Link from "next/link";
import style from "../styles/Nav.module.css";

import { useState } from "react";
import { signOut } from "next-auth/react";

export default function NavAdmin() {
    const [activo, setActivo] = useState(false);
    const handleActivo = () => setActivo(!activo);

    function salirSesion() {
        setActivo(!activo);
        signOut();
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
                        <Link className={style.enlace} href="/pendientes" onClick={handleActivo}>Pendientes</Link>
                    </li>
                    <li className={style.navListaEnlaces}>
                        <Link className={style.enlace} href="/turnos" onClick={handleActivo}>Turnos</Link>
                    </li>
                    <li className={style.navListaEnlaces}>
                        <Link className={style.enlace} href="/agenda" onClick={handleActivo}>Agenda</Link>
                    </li>
                    <li className={style.navListaEnlaces}>
                        <button className={style.enlace} onClick={salirSesion}>Salir</button>
                    </li>
                </ul>
            </nav>
        </header>
        
    );
}