import { create } from "zustand";

const useStore = create((set) => ({
    isAuthenticated: false,
    isAdmin:  false,
    idUsuario: null,

    servicio: null,
    descripcion: null,
    nombre: null,
    apellido: null,
    direccion: null,
    piso: null,
    celular: null,
    fecha: null,
    hora: null,

    changeIsAuthenticated: () => set((state) => ({ isAuthenticated: !state.isAuthenticated })),
    changeIsAdmin: () => set((state) => ({ isAdmin: !state.isAdmin })),
    changeIdUsuario: (id) => set( { idUsuario: id } ),

    changeServicio: (servicio) => set( { servicio } ),
    changeDescripcion: (descripcion) => set( { descripcion } ),
    changeQuien: (quien) => set( { quien } ),
    changeNombre: (nombre) => set( { nombre } ),
    changeApellido: (apellido) => set( { apellido } ),
    changeDireccion: (direccion) => set( { direccion } ),
    changePiso: (piso) => set( { piso } ),
    changeCelular: (celular) => set( { celular } ),
    changeFecha: (fecha) => set( { fecha } ),
    changeHora: (hora) => set( { hora } ),
}));

export default useStore;