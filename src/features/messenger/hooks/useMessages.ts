import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../app/store/store';
import { useGetDialoguesQuery } from '../api/messengerApi';
import { setDialogues } from '../slice/messagesSlice';

const useMessages = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { data: dialogues, refetch } = useGetDialoguesQuery();

    useEffect(() => {
        if (dialogues) {
            dispatch(setDialogues({ dialogues: dialogues.results }));
        }
    }, [dialogues, dispatch]);

    return { refetch };
};

export default useMessages;
