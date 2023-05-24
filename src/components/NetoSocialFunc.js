import { useEffect, useState } from "react";
import Header from "./HeaderFunc";
import LoginPage from "./LoginPageFunc";
import LogoutPage from "./LogoutPageFunc";
import { AuthContext } from "../context/AuthContext";
import { storagePermission, storageLoadToken, removeProfile } from "./StorageFunc";
import Preloader from "./PreloaderFunc";

export default function NetoSocial() {
    const [token, setToken] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [hasError, setHasError] = useState(false)
    const [permission, setPermission] = useState(false);

    useEffect(() => {
        if (storagePermission()) {
            setToken(storageLoadToken().profile.token)
            setPermission(true)
        }
    }, [])

    useEffect(() => {
        if (hasError) {
            removeProfile()
            setPermission(false)
        }
    }, [hasError])

    return (
        <AuthContext.Provider value={{token, setToken, profile, setProfile, loading, setLoading, hasError, setHasError, permission, setPermission}}>
            <div className="neto-social">
                <Header />
                {permission ? <LoginPage token={token}/> : loading ? <Preloader /> : <LogoutPage />}
            </div>
        </AuthContext.Provider>
    )
}