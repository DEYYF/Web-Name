export const getUsers = async () => {
    const url = `https://proyecto-unai.free.beeceptor.com/users`
    const resp = await fetch ( url );
    const {data} = await resp.json();

    const users = data.map(user => ({
        id: user.id,
        email: user.email,
        password: user.password
    }));

    return users;

    

}