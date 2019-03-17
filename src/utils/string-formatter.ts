import { CONSTANTS } from '../shared/constants';

export function getCategoryByKey(key: string){
    const category = CONSTANTS.TODO.CATEGORY.find(x => x.key === key.toLowerCase());
    return category ? category : {};
}

export function getUsernameByEmail(email: string){
    return email.slice(0, email.indexOf('@'));
}