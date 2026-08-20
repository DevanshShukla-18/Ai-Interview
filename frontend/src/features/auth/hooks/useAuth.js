import { useContext, useEffect } from "react";
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
            throw error;
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
            throw error;
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
            throw error;
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        const getAndSetUser = async () => {
            try{
                const data = await getMe();
                setUser(data.user);
            }catch(error){
                // setUser(null);
            }finally{
                setLoading(false);
            }
        }

        getAndSetUser();
    },[])

    return {user, loading, handleRegister, handleLogin, handleLogout};
}