import React from 'react';
import './Register_btn.css';
import { Button} from 'antd';
import { Link } from 'react-navi';



export default function Register_btn() {

    return (
      <>
        <Button id="register_btn" type="primary">
        <Link href="/Register">Register</Link>
        </Button>
      </>
    );
}
