import React, { useContext } from 'react';
import './RegisterBtn.css';
import { Button} from 'antd';
import { Link } from 'react-navi';
import { UserContext } from './context';



export default function RegisterBtn() {

  const { user, dispatch } = useContext(UserContext)
  if (!user.username) {
    return (
      <>
        <Button id="register_btn" type="primary">
        <Link href="/Register">Register</Link>
        </Button>
      </>
    );
  }else{
    return " "
  }
}
