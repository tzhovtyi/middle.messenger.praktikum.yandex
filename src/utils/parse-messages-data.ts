import { messageFromSocket } from '../services/types';
import parseDate from './parseDate';

export default function parseMessages(
    mes: Array<messageFromSocket> | messageFromSocket,
    userId: number
) {
    if (Array.isArray(mes)) {
        return mes.map(item => {
            const fromThisUser = item.user_id === userId;
            return {...item, time: parseDate(item.time), fromThisUser: fromThisUser};
        });
    } else {
        const fromThisUser = mes.user_id === userId;
        return {...mes, time: parseDate(mes.time), fromThisUser: fromThisUser};
    }
}
