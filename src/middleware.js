export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/agenda", "/historial", "/pendientes", "/perfil", "/reprogramar", "/solicitar-turno/:path*", "/turnos"],
}