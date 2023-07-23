'use client'

import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/router";
import useStore from "../../../store/store.js";

import style from "../../../styles/Servicio.module.css";
import boton from "../../../styles/Botones.module.css";

import peloYBarbaServicio from "../../../img/corte-y-barba-servicio.jpeg";
import botoxServicio from "../../../img/botox-servicio.jpg";
import colorServicio from "../../../img/color-servicio.jpeg";
import alisadoServicio from "../../../img/alisado-servicio.jpeg";
import barbaServicio from "../../../img/barba-servicio.jpeg";
import brushingServicio from "../../../img/brushing-servicio.jpeg";
import keratinaServicio from "../../../img/keratina-servicio.jpeg";
import corte from "../../../img/corte-servicio.jpeg";
import reloj from "../../../img/reloj.svg";

export default function Servicio () {
    const router = useRouter();
    const changeServicio = useStore( (state) => state.changeServicio);

    const DIRECTION = {
        RIGHT: "RIGHT",
        LEFT: "LEFT"
    }
    let isMoving = false;
    let startX;
    let startScrollLeft;

    function mouseMove(e) {
        const contenido = document.querySelector("#contenido");

        if (!isMoving) return;
        contenido.scrollLeft = startScrollLeft - (e.pageX - startX);
    }
    function touchMove(e) {
        const contenido = document.querySelector("#contenido");

        if (!isMoving) return;
        contenido.scrollLeft = startScrollLeft - (e.touches[0].clientX - startX);
    }
    function touchDown(e) {
        const rootStyle = document.documentElement.style;
        rootStyle.setProperty("--scroll-behavior", "auto");

        isMoving = true;
        startX = e.touches[0].clientX;
        startScrollLeft = contenido.scrollLeft;
    }
    function mouseDown(e) {
        const rootStyle = document.documentElement.style;
        rootStyle.setProperty("--scroll-behavior", "auto");

        isMoving = true;
        startX = e.pageX;
        startScrollLeft = contenido.scrollLeft;
    }
    function mouseUp() {
        const rootStyle = document.documentElement.style;
        rootStyle.setProperty("--scroll-behavior", "smooth");
        isMoving = false;
    }
    function moveSlider (direction) {
        const contenido = document.querySelector("#contenido");
        const primera = contenido.querySelector("#sliderElement").offsetWidth;

        contenido.scrollLeft += direction === "LEFT" ? -primera - 15 : primera + 15; 
    }

    useEffect(()=> {
        document.addEventListener("mouseup", mouseUp);
    })

    function seleccionarServicio(e) {
        const servicio = e.currentTarget.firstChild.textContent
        if(startScrollLeft !== contenido.scrollLeft){
            return;
        } else {
            changeServicio(servicio);
            router.push("/solicitar-turno/descripcion");
        }
    }

    return (
        <>
            <Head>
                <title> Emanuel Duarte - Turno</title>
            </Head>

            <div className="contenedor alinear-medio">
                <h1>Servicios</h1>
            </div>

            <main className={style.grid}>
                <aside>
                    <div className={boton.flecha} id="left" onClick={() => moveSlider(DIRECTION.LEFT)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </div>

                </aside>

                <div 
                    id="contenido" 
                    className={style.contenido} 
                    onMouseDown={mouseDown} 
                    onMouseMove={mouseMove}
                    onTouchMove={touchMove}
                    onTouchEnd={mouseUp}
                    onTouchStart={touchDown}
                >
                    <ul className={style.slider}>
                        <li onClick={seleccionarServicio} id="sliderElement" className={style.sliderElement}>
                            <h4>Corte</h4>
                            <Image className={style.imagen} src={corte} alt="servicio corte barba" width={250} height={300} />
                            <p className={style.duracion}>
                                <Image src={reloj} alt="icono reloj servicios" width={20} height={20}/>
                                40min
                            </p>
                        </li>
                        <li onClick={seleccionarServicio} className={style.sliderElement}>
                            <h4>Barba</h4>
                            <Image className={style.imagen} src={barbaServicio} alt="servicio corte barba" width={250} height={200} />
                            <p className={style.duracion}>
                                <Image src={reloj} alt="icono reloj servicios" width={20} height={20}/>
                                30min
                            </p>
                        </li>
                        <li onClick={seleccionarServicio} className={style.sliderElement}>
                            <h4>Corte + Barba</h4>
                            <Image className={style.imagen} src={peloYBarbaServicio} alt="servicio corte barba" width={250} height={300} />
                            <p className={style.duracion}>
                                <Image src={reloj} alt="icono reloj servicios" width={20} height={20}/>
                                45min
                            </p>
                        </li>
                        <li onClick={seleccionarServicio} className={style.sliderElement}>
                            <h4>Color</h4>
                            <Image className={style.imagen} src={colorServicio} alt="servicio corte barba" width={200} height={300} />
                            <p className={style.duracion}>
                                <Image src={reloj} alt="icono reloj servicios" width={20} height={20}/>
                                2hrs-4hrs
                            </p>
                        </li>
                        <li onClick={seleccionarServicio} className={style.sliderElement}>
                            <h4>Alisado</h4>
                            <Image className={style.imagen} src={alisadoServicio} alt="servicio corte barba" width={200} height={300} />
                            <p className={style.duracion}>
                                <Image src={reloj} alt="icono reloj servicios" width={20} height={20}/>
                                2hrs
                            </p>
                        </li>
                        <li onClick={seleccionarServicio} className={style.sliderElement}>
                            <h4>Brushing</h4>
                            <Image className={style.imagen} src={brushingServicio} alt="servicio corte barba" width={200} height={300} />
                            <p className={style.duracion}>
                                <Image src={reloj} alt="icono reloj servicios" width={20} height={20}/>
                                40min
                            </p>
                        </li>
                        <li onClick={seleccionarServicio} className={style.sliderElement}>
                            <h4>Botox</h4>
                            <Image className={style.imagen} src={botoxServicio} alt="servicio corte barba" width={250} height={300} />
                            <p className={style.duracion}>
                                <Image src={reloj} alt="icono reloj servicios" width={20} height={20}/>
                                2hrs
                            </p>
                        </li>
                        <li onClick={seleccionarServicio} className={style.sliderElement}>
                            <h4>Keratina</h4>
                            <Image className={style.imagen} src={keratinaServicio} alt="servicio corte barba" width={200} height={300} />
                            <p className={style.duracion}>
                                <Image src={reloj} alt="icono reloj servicios" width={20} height={20}/>
                                2hrs
                            </p>
                        </li>
                    </ul>
                </div>

                <aside>
                    <div className={boton.flecha} id="right" onClick={() => moveSlider(DIRECTION.RIGHT)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </div>
                </aside>
            </main>

            <div className="contenedor alinear-derecha">
                <Link href="/solicitar-turno/descripcion" className={boton.verde}>Siguiente</Link>
            </div>
        </> 
    )
}


