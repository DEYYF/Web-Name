import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { getUsers } from '../helpers/getUsers';
import './LoginForm.css';
import { Button, Form, Input } from 'antd';

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
      <>
        <Form>
          <Form.Item label= 'Username' name='username'>
            <Input type="text" placeholder='Username' onChange={(event) => setUsername(event.target.value)} ></Input>
          </Form.Item>

          <Form.Item label= 'Password' name='Password'>
            <Input type="password" placeholder='Password' onChange={(event) => setPassword(event.target.value)} ></Input>
          </Form.Item>

          <Form.Item>
            <Button type='primary' onClick={proceedLogin}>Login</Button>
          </Form.Item>
        </Form>
      </>
  );
}
