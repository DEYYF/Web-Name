import { useState } from "react";
import { getUsers } from "../helpers/getUsers";
import { UserApp } from "./UserApp";

export const UsPass = ({onNewUser}) => {
    const [inputemail, setinputEmail] = useState();

    const [inputpass, setinputPass] = useState();


    const onInputChangeEmail = (event) => {
        setinputEmail(event.target.value)
    }

    const onInputChangePass = (event) => {
        setinputPass(event.target.value)
    }

    const onSubmitChange = ( event ) => {
        event.preventDefault();
        const inputemailtrim = inputemail.trim();
        const inputpasstrim = inputpass.trim();

        if (inputemailtrim <= 1 && inputpasstrim <= 1) return;

        const user = {
            email: inputemailtrim,
            password: inputpasstrim
        };

        onNewUser(user)
        setinputEmail('')
        setinputPass('');
    }

    
    return (
        <form onSubmit={onSubmitChange}>

            <input
            type="text"
            placeholder="Introuduce el email"
            value={inputemail}
            onChange={onInputChangeEmail}/>

            <input
            type="text"
            placeholder="Introuduce la contraseña"
            value={inputpass}
            onChange={onInputChangePass}/>
        </form>
    )
}