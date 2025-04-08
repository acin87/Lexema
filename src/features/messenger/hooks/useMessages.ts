import { useGetDialoguesQuery } from '../api/messengerApi';

const useMessages = () => {
    const { data: dialogues } = useGetDialoguesQuery();

    return { dialogues };
};

export default useMessages;
