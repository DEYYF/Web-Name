import { useState } from "react"
import { UsPass } from "./UsPass"
import { getUsers } from "../helpers/getUsers"

export const UserApp = () => {

    const [users, setUsers] = useState();

    const onAddUsers = ( newUser ) => {

        if (users.includes(newUser)) return;

        setUsers(...users, newUser);
    }

    const auth = () => {
        const Users = getUsers();

        Users.map(User => {
            users.forEach(user => {
                if (User.email === user.email && User.password === user.password) {
                    console.log('Iniciar sesion');
                }
            })
        });
    }

    return (
        <>
            <h1>ProyectWebApp</h1>
            <UsPass onNewUser={onAddUsers}/>
            <button onClick={auth}>Iniciar sesion</button>
        </>
    )
    
}