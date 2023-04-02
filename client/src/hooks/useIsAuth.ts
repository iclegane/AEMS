import {useSelector} from "react-redux";
import {RootState} from "../store/store";

export const useIsAuth = () => {
    const auth = useSelector((state: RootState) => state.authReducer.auth);
    return !!auth?.isAuth;
};
