import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useMemo} from 'react';
import {setPageTitle} from '../store/reducers/TitleSlice';
import {RootState} from '../store/store';


export function usePageTitle(title: string) {
    const dispatch = useDispatch();

    const setTitle = useMemo(() => {
        return (title: string) => {return dispatch(setPageTitle(title));};
    }, [dispatch]);

    useEffect(() => {
        setTitle(title);
        return () => {
            dispatch(setPageTitle(''));
        };
    }, [title, setTitle, dispatch]);

    const pageTitle = useSelector((state: RootState) => {return state.pageTitle.title;});

    useEffect(() => {
        document.title = pageTitle;
    }, [pageTitle]);
}
