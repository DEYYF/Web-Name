import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { getUsers } from '../helpers/getUsers';
import './LoginForm.css';

export const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');


  const navigate = useNavigate();

  const getUsersData = async () => {
    const newUser = await getUsers();
    setUser(newUser);
  }

  const proceedLogin = (event) => {
    event.preventDefault(); 

    if (validate()) {

      navigate('/items'); 

    } else {
      
      console.log('No auth');
    }
  };

  const validate = () => {
    return username === user.Email && password === user.Password;
  }

  useEffect(() => {
    getUsersData();
  }, []);

  return (
    <div className="row">
      <form onSubmit={proceedLogin} className="container">
        <div className="card">
          <div className="card-header">
            <h2>User Login</h2>
          </div>
          <div className="card-body">
            <div className="form-group">
              <label>Email <span className="errmsg">*</span></label>
              <input value={username} onChange={e => setUsername(e.target.value)} className="form-control"/>
            </div>
            <div className="form-group">
              <label>Password <span className="errmsg">*</span></label>
              <input type='password' value={password} onChange={e => setPassword(e.target.value)} className="form-control"/>
            </div>
            <div className="card-footer">
              <button type="submit" className="btn btn-primary" onClick={proceedLogin}>Login</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
