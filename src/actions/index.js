import types from './types';
import { db } from '../firebase';

export function getAllMessages() {
    return async function(dispatch){
        db.ref('/messages').on('value', (snapshot) => {

            dispatch({
                type:types.GET_CHAT_MESSAGES,
                messages: snapshot.val()
            });
        });
    }
}