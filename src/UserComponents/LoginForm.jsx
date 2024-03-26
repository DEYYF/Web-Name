import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";

export const LoginForm = () => {
  return (
    <div className="wrapper">
        <form action="">
            <h1>Login</h1>
            <div className="input-box">
                <input type="text" placeholder="Username" required/>
                <FaUser/>
            </div>
            <div className="input-box">
                <input type="pass" placeholder="Password" required/>
                <FaLock />
            </div>

            <button type="submit">Login</button>
        </form>
    </div>
  )
}
