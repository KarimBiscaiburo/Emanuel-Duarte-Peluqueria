import Link from "next/link";
import Image from "next/image";

import style from "../styles/Footer.module.css";
import whatsappIcon from "../img/whatsapp.png";
import instagramIcon from "../img/instagram.png";

export default function Footer() {

    return(
        <footer className={style.footer}>
            <div>
                <p className={style.consultas}>Consultas:</p>
            </div>
            <div className={style.iconos}>
                <div className={style.icono}>
                    <Image
                        src={whatsappIcon} 
                        alt="whatsapp-icon" 
                        width="35" 
                        height="35"
                    />
                    
                    <p className={style.celular}>1125403545</p>
                </div>

                <div className={style.icono}>
                    <Image
                        src={instagramIcon} 
                        alt="instagram-icon" 
                        width="35" 
                        height="35"
                    />

                    <Link className={style.instagram} href="https://www.instagram.com/emaduarte22" target="blank">emaduarte22</Link>
                </div>
            </div>
            <div className={style.nombre}>
                <p className={style.nombreTexto}>EMANUEL DUARTE</p>
            </div>
        </footer>
    );
}