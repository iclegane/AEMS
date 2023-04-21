import { useNavigate } from 'react-router-dom';
import { logout } from '../store/actions/AuthAction';
import { useAppDispatch } from './redux';


function useLogout() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await dispatch(logout());
        navigate('/');
    };

    return handleLogout;
}

export default useLogout;
