import { getUser } from "../api/apiService";

export const isAdminOrSuper = async () => {
    const { data:{ profile } } = await getUser(localStorage.getItem('@App:email'));
    return profile === 'admin' || profile === 'super';
}