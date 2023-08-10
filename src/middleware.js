import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server'
import useStore from './store/store';

export async function middleware(request) {

    console.log("hola");

    // return NextResponse.redirect(new URL("/", request.url))
    return NextResponse.next();
}

export const config = {
    matcher: ["/agenda", "/historial", "/pendientes", "/perfil", "/reprogramar", "/solicitar-turno/datos", "/solicitar-turno/descripcion", "/solicitar-turno/fecha", "/solicitar-turno/quien", "/solicitar-turno/servicio", "/turnos"]
}