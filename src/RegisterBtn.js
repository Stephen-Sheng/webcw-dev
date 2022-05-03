import React, { useContext } from 'react';
import './RegisterBtn.css';
import { Button } from 'antd';
import { Link } from 'react-navi';
import { UserContext } from './context';
import { BigScreen, Mobile, Retina } from './responsive';


export default function RegisterBtn() {
  const { user } = useContext(UserContext)
  if (!user.username) {
    return (
      <>
        <BigScreen>
          <Button className='big-screen' id="register_btn" type="primary">
            <Link href="/Register">Register</Link>
          </Button>
        </BigScreen>
        <Mobile><Button className='mobile' id="register_btn" type="primary">
          <Link href="/Register">Register</Link>
        </Button>
        </Mobile>
        <Retina><Button id="register_btn" type="primary">
          <Link href="/Register">Register</Link>
        </Button>
        </Retina>
      </>
    );
  } else {
    return " "
  }
}
