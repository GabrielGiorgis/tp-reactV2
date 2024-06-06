import { useNavigate } from "react-router-dom";


export const Logout = () => {
    localStorage.removeItem('idUser');
    const navigate = useNavigate();
    navigate(-1)
    return null;
}
