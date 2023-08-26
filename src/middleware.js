export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  console.log(session)
  if(session) {
    if(req.nextUrl.pathname.startsWith("/turnos") || req.nextUrl.pathname.startsWith("/agenda") || req.nextUrl.pathname.startsWith("/pendientes")) {
      if(session.user === "admin") {
        return NextResponse.next()
      } else {
        return NextResponse.redirect(new URL("/", req.url))
      }
    }

    if(req.nextUrl.pathname.startsWith("/perfil") || req.nextUrl.pathname.startsWith("/historial") || req.nextUrl.pathname.startsWith("/solicitar-turno/servicio")) {
      if(!isNaN(session.user)) {
        return NextResponse.next()
      } else {
        return NextResponse.redirect(new URL("/", req.url))
      }
    }

  } else {
    return NextResponse.redirect(new URL("/iniciar-sesion", req.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ["/agenda", "/historial", "/pendientes", "/perfil", "/reprogramar", "/solicitar-turno/:path*", "/turnos"],
}