import { useNavigate } from 'react-router-dom';
import { logout } from '../store/actions/AuthAction';
import { useAppDispatch } from "./redux";


function useLogout() {
    const dispatch = useAppDispatch();

    const handleLogout = async () => {
        await dispatch(logout());
    };

    return handleLogout;
}

export default useLogout;
