import {auth} from '../initFirebase';

export const getCurrentUser = () => {
    return auth.currentUser;
};
