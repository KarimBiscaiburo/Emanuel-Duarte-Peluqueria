import NavAdmin from "./nav-admin";
import NavCliente from "./nav-cliente";
import NavInicio from "./nav-inicio";

import useStore from "@/store/store";

export default function Navegacion() {
    const isAuthenticated = useStore((state) => state.isAuthenticated);
    const isAdmin = useStore((state) => state.isAdmin);

    return (
        <> 
            { isAuthenticated ? isAdmin ? <NavAdmin /> : <NavCliente /> : <NavInicio /> }
        </>
    );
}
  