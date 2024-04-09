import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { getUsers } from '../helpers/getUsers';
import './LoginForm.css';
import { Button, Form, Input, message } from 'antd';

export const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');
  const [messageApi, contexHolder] = message.useMessage();



  const sucess = () => {
    messageApi.open({
      type: 'success',
      content: 'Usuario y contraseña correcta'
    });
  };

  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'Fallo en usuario y/o contraseña',
    });
  };




  const navigate = useNavigate();

  const getUsersData = async () => {
    const newUser = await getUsers();
    setUser(newUser);
  }

  const proceedLogin = (event) => {
    event.preventDefault(); 

    if (validate()) {
      sucess();
      const user = {
        Email: username,
        password: password
      };

      setTimeout(() => {
        navigate('/items', { state: { data: user}}); 
      }, 1000);
      

    } else {
      
      error();
      
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
      <>
        {contexHolder}
        <div className='backGround'>
          <div className='login-form-container'>
            <h2 className='login-form-title'>Login</h2>
            <Form>
              <div className='login-form-input'>
                <Form.Item label= 'Username' name='username'>
                  <Input type="text" placeholder='Username' onChange={(event) => setUsername(event.target.value)} ></Input>
                </Form.Item>
              </div>

              <div className='login-form-input'>
                <Form.Item label= 'Password' name='Password'>
                  <Input type="password" placeholder='Password' onChange={(event) => setPassword(event.target.value)} ></Input>
                </Form.Item>
              </div>

              <div className='login-form-button-container'>
                <Form.Item>
                  <Button type='primary' onClick={proceedLogin}>Login</Button>
                </Form.Item>
              </div>
            </Form>
          </div>
        </div>
      </>
  );
}
