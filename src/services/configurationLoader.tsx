import {useQuery} from '@tanstack/react-query';

async function getCommands() {
    const response = await fetch('http://localhost:5500/config')
    // const response = await fetch('http://localhost:5000/config')
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    return await response.json();
}

export function configuration() {
    // cerca di scaricare configurazione da server remoto con axios
    // https://drive.google.com/file/d/19r4fl9Bk-moXJHaHdR_Hd3Upb0RZW7s_/view?usp=drive_link

    const {isPending, isError, data, error} = useQuery({queryKey: ['Commands'], queryFn: getCommands});

    if (isPending) {
        return 'Loading...'
    }
    return data;
}

