import React, { useEffect } from 'react';
import './styles.css'
import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
function Header() {

  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, loading]);
  function logoutfunction() {
    try {
      signOut(auth)
        .then(() => {
          toast.success("Logged out succesfully");
          navigate("/");
        })
        .catch((error) => {
             toast.error(error.message);
        })
    }
    catch (e) {
      toast.error(e.message);
    }
  }

  return (
    <div className='navbar'>
      <p className='logos'>Financely</p>
      {user && <p onClick={logoutfunction} className='link logos'>Logout</p>
      }
    </div>
  )
}

export default Header;