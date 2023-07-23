export async function solicitarUsuario(idUsuario) {
    try {
        const res = await fetch("http://localhost:3000/api/obtenerDatosPerfil",{
            method: "POST",
            headers: {
                "Content-Type": "application/json" 
            },
            body: idUsuario
        });
        const data = await res.json();
        return data ;
    } catch (error) {
        console.error(error);
        return error;
    }
}