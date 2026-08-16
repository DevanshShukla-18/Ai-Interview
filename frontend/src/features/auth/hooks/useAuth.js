import { useContext } from "react";
import { AuthContext } from "../auth.context";
import {login, register, logout, getMe} from "../services/auth.api.js"

export const useAuth = () => {

    const context = useContext(AuthContext);
    const {user, setUser, loading, setLoading} = context;

    const handleLogin = async ({email, password}) => {
        setLoading(true);

        try{
            const data = await login({email, password});
            setUser(data.user);
        }catch(error){
            console.log(error);
        }finally{
            setLoading(false);
        }
    }

    const handleRegister = async ({userName, email, password}) => {
        setLoading(true);
        try{
            const data = await register({userName, email, password});
            setUser(data.user);
        }catch(error){
            console.log(error);
        }finally{
            setLoading(false);
        }
    }

    const handleLogout =async () => {
        setLoading(true);
        try{
            const data = await logout();
            setUser(null);
        }catch(error){
            console.log(error);
        }finally{
            setLoading(false);
        }
    }

    return {user, loading, handleRegister, handleLogin, handleLogout};
}