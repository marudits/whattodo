export function getUsernameByEmail(email: string){
    return email.slice(0, email.indexOf('@'));
}