export const getUsers = async () => {
    const url = `https://fakestoreapi.com/users/1`
    const resp = await fetch ( url );
    const { email, password } = await resp.json();

    const user = {
        Email: email,
        Password: password
    }

    

    return user;

    

}