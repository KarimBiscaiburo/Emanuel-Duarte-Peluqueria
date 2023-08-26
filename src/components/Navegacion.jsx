import NavAdmin from "./Nav-admin";
import NavCliente from "./Nav-cliente";
import NavInicio from "./Nav-inicio";

import { useSession } from "next-auth/react";

export default function Navegacion() {
    const { data: session } = useSession();
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
  