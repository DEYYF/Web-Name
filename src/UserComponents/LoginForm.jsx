import { getUsers } from '../helpers/getUsers';
import './LoginForm.css'
import { useEffect, useState } from "react";

export const LoginForm = () => {

  const [username, setusername] = useState('');
  const [Password, setPassword] = useState('');
  const [User,setUser] = useState('');

  const getusers = async() => {
    const newUser = await getUsers();
    setUser(newUser);
    console.log(User);
    ;
  }

  

  const ProceedLogin = (event) => {
    event.preventDefault();
    if (validate()) {
      console.log('Auth')
    }
  }

  

  const validate = () => {
    let result=true;
    if (username !== User.Email || Password !== User.Password) {
      result= false;
  
    }
    return result;
  }

  useEffect(() => {
    getusers();
    console.log(User);
  }, [ '']);


  return (
    <div className="row">
        <form onSubmit={ProceedLogin} className="container">
          <div className="card">
            <div className="card-header">
              <h2>User Login</h2>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label>UserName <span className="errmsg">*</span></label>
                <input value={username} onChange={e=>setusername(e.target.value)} className="form-control"/>
              </div>
              <div className="form-group">
                <label>Password <span className="errmsg">*</span></label>
                <input type='password' value={Password} onChange={e=>setPassword(e.target.value)} className="form-control"/>
              </div>
              <div className="card-footer">
                <button type="submit" className="btn btn-primary" onClick={ProceedLogin}>Login</button>
              </div>
            </div>
          </div>
        </form>
    </div>
  )
}
