import { useContext } from "react"
import HeaderLogin from "./HeaderLoginFunc";
import HeaderLogout from "./HeaderLogoutFunc";
import { AuthContext } from "../context/AuthContext";

export default function Header() {
    const {token, permission} = useContext(AuthContext)

    return (
        <div className="header-container">
            <a className="header-logo-link" href="https://alexwebart.github.io/ra-authentication/">
                <h3 className="header-title">Neto Social</h3>
            </a>
            {permission ? <HeaderLogout token={token}/> : <HeaderLogin />}
        </div>
    )
}