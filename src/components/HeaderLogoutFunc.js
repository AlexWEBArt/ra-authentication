import useJsonFetch from "../hooks/useJsonFetch";
import { removeProfile } from "./StorageFunc";
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect } from "react";

export default function HeaderLogout() {
    const {token, setPermission, profile, setProfile } = useContext(AuthContext);

    const [data, error] = useJsonFetch(process.env.REACT_APP_PROFILE_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        
    });

    const handleClickLogout = () => {
        removeProfile();
        setPermission(false);
    }

    useEffect(() => {
        setProfile(data);

        if (error) {
            removeProfile();
            setPermission(false);
        }
    }, [data, error, setProfile, setPermission])
    
    return (
        profile &&
        <div className="authorized-container">
            <p className="authotized-greeting">Hello, {profile.name}</p>
            <img className="user-avatar" src={profile.avatar} alt={'avatar of user ' + profile.name}></img>
            <button className="btn btn-logout" onClick={handleClickLogout}>Login</button>
        </div>
        
    )
}