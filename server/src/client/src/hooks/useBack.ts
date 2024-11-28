import { useCallback } from 'react';
import { useNavigate } from 'react-router';

const useBack = () => {
    const navigate = useNavigate();

    const back = useCallback(() => {
        if (window.history.state.key) {
            navigate(-1);
        } else {
            navigate('/');
        }
    }, [navigate]);

    return back;
};

export default useBack;
