export const getUsers = async () => {
    
    const resp = await fetch (`https://fakestoreapi.com/users/1`);
    const { email, password } = await resp.json();

    const user = {
        Email: email,
        Password: password
    }

    

    return user;

    

}