import { useEffect, useState, useContext } from "react";
import useJsonFetch from "../hooks/useJsonFetch";
import { addProfileToken, storagePermission, storageLoadToken } from "./StorageFunc";
import { AuthContext } from "../context/AuthContext";

export default function HeaderLogin() {
    const {setToken, setPermission} = useContext(AuthContext)
    const [requestData, setRequestData] = useState({
        body: '',
        url: ''
    })
    const [inputChange, setInputChange] = useState({
        userName: '',
        password: ''
    })
    const [data, error] = useJsonFetch(requestData.url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData.body)
    });

    useEffect(() => {
        if (storagePermission()) {
            setToken(storageLoadToken().profile.token)
            setPermission(true)
        }
    }, [setToken, setPermission])

    useEffect(() => {
        if (data) {
            addProfileToken({ profile: { login: requestData.body.login, token: data.token }})
            setToken(data.token)
            setPermission(true)
        }
        if (error) {
            setRequestData({ body: '', url: '' })
            setPermission(false)
        }
        return () => setRequestData({ body: '', url: '' })
    }, [requestData, data, error, setToken, setPermission, setRequestData])

    const handleChange = (e) => {
        const { name, value } = e.target;

        name === 'username' && setInputChange(prevChange => ({ ...prevChange, userName: value }));
        name === 'password' && setInputChange(prevChange => ({ ...prevChange, password: value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const body = { login: inputChange.userName, password: inputChange.password }
        setRequestData({ body, url: process.env.REACT_APP_LOGIN_URL })
    }

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            {error && <span className="error-message">Неверное имя или пароль </span>}
            <input className="login-input username" type="text" name="username" placeholder="Username" onChange={handleChange} required></input>
            <input className="login-input password" type="password" name="password" placeholder="Password" onChange={handleChange} required></input>
            <button className="btn btn-login">Login</button>
        </form>
    )
}