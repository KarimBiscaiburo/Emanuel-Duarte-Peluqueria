import NavAdmin from "./nav-admin";
import NavCliente from "./nav-cliente";
import NavInicio from "./nav-inicio";

import { useSession } from "next-auth/react";

export default function Navegacion() {
    const { data: session } = useSession();
    console.log(session)
    return (
        <> 
            {
                session?.user === "admin" ? <NavAdmin /> 
                :
                !isNaN(session?.user) ? <NavCliente /> 
                :
                <NavInicio />
            }
            {/* { isAuthenticated ? isAdmin ? <NavAdmin /> : <NavCliente /> : <NavInicio /> }  */}
        </>
    );
}
  