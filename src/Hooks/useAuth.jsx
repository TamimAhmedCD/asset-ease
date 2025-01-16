import { useContext } from "react";
import { AuthProvider } from './../Context/AuthContext';

const useAuth = () => {
    const auth = useContext(AuthProvider)
    return auth
};

export default useAuth;