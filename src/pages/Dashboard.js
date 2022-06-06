import Button from 'react-bootstrap/Button'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import AuthContext from '../context/AuthProvider'
import { MdLogout } from 'react-icons/md'
import { BiSmile } from 'react-icons/bi'
import ResetPass from './ResetPass'




const Dashboard = () => {
  const [showReset, setShowReset] = useState(false);
  const { auth, setAuth } = useContext(AuthContext)
  const navigate = useNavigate();


  const [searchParams] = useSearchParams();

  useEffect(() => {
    const identity = JSON.parse(localStorage.getItem('auth'))?.identity;
    const redirect = searchParams.get('redirect');

    if (searchParams.get('redirect')) {
      window.location = (`${redirect}?identity=${identity}`)
    }
  }, [])

  const logout = () => {
    // Clear auth from localStorage/authContext and navigate to loginOptions page
    localStorage.removeItem('auth');
    setAuth({});
    navigate('/');
  }

  const reset = () => {
    setShowReset(!showReset);
  }

  return (
    // TODO move to be on the route level
    (auth && auth?.identity) ?
      <section className='d-flex flex-column'>
        <h1>Welcome to the dashboard <BiSmile /></h1>
        <p className='text-secondary my-5'>{`Email: ${auth?.email}`}</p>
        {showReset ? <ResetPass setShowReset={setShowReset} /> : (<></>)}
        <div className='d-flex justify-content-between mt-5'>
          <Button variant='outline-secondary' onClick={logout}><MdLogout /><span className='m-2'>Logout</span></Button>
          {!showReset ? <Button variant='outline-danger' onClick={reset}><MdLogout /><span className='m-2'>Reset password</span></Button> : (<></>)}
        </div>
      </section>
      :
      navigate('/')
  )
}

export default Dashboard