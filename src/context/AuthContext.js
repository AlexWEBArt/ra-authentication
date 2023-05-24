import { createContext } from "react";

export const AuthContext = createContext({
    token: null,
    profile: null,
    isLoading: false,
    hasError: false,
    permission: false
})