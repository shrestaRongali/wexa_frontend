import React, { useEffect, useState } from 'react'
import "./HomePage.scss"
import { httpService, IAPIResponse } from '../../services/httpService';
import { useNavigate } from 'react-router-dom';
import Home from './components/Home';
import Requests from './components/Requests';
import Profile from './components/Profile';
import { logout } from '../../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import ErrorPopUp from '../../components/errorPopUp/errorPopUp';


export interface UserDetailsInterface{
    id: number,
    name: string,
    email: string,
    phone: string,
    url: string,
    last_log_in: string
}


const HomePage = (props: any) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [userDetails, setUserDetails] = useState<UserDetailsInterface>()
    const [showRegisterPopUp, setShowRegisterPopUp] = useState(false)

    const [userRole, setUserRole] = useState()

    const [home,setHome] = useState(false)
    const [requests, setRequests] = useState(false)
    const [profile, setProfile] = useState(false)

    const [error, setError] = useState(`Welcome!! We're excited to have you here! 🌟`)
    const [errorPopUp, setErrorPopUp] = useState(false)

    const logoutHandler = ()=>{
        navigate("/")
        dispatch(logout());
    }

    const getUserProfile = async()=>{
        let response: any = await httpService("http://localhost:6005/wexa","/user").GET()
        console.log(response)
        if (response.apiResponse.data.success) {
            setUserDetails(response.apiResponse.data.data)
            setHome(true)

            setErrorPopUp(true)
            setTimeout(()=>{setErrorPopUp(false)},3000)
        }
    }

    useEffect(()=>{
        getUserProfile()
    },[])

    return (
    <>
    <div className = "screen">
    <div className="navbar">
        <div className=''>Welcome</div>
        {userDetails && (<div className=''>HI! {userDetails.name}</div>)}
    </div>
    <div className='containerr'>
        <div className='body pr-0'>
            {home && (<Home userDetails={userDetails}></Home>)}
            {requests && (<Requests></Requests>)}
            {profile && (<Profile userDetails={userDetails} setUserDetails={setUserDetails}></Profile>)}
        </div>
        <div className='sidebar'>
            <div className='sd-mn'>
                <div className={`button ${home ? 'font-bold bg-dark-orange' : ''}`} onClick={()=>{setHome(true); setRequests(false); setProfile(false)}}>
                    <p className='p-2'>Dashboard</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6" width="20" height="20">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                </div>
                <div className={`button ${requests ? 'font-bold bg-dark-orange' : ''}`} onClick={()=>{setHome(false); setRequests(true); setProfile(false)}}>
                    <p className='p-2'>Friends</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6" width="20" height="20">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                    </svg>
                </div>
                <div className={`button ${profile ? 'font-bold bg-dark-orange' : ''}`} onClick={()=>{setHome(false); setRequests(false); setProfile(true)}}>
                    <p className='p-2'>Profile</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6" width="20" height="20">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                </div>
            </div>
            <div className='sd-f'>
                <button className='button hover:font-bold' onClick={logoutHandler}>
                    <p className='p-2'>Logout</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6" width="20" height="20">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                    </svg>
                </button>
                <button className='button hover:font-bold bg-black text-white bg-black'>
                    <p className='p-2'>Help Center</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6" width="20" height="20">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                    </svg>
                </button>
            </div>

        </div>
    </div>
    </div>
    {errorPopUp && <ErrorPopUp error={error} setErrorPopUp={setErrorPopUp}></ErrorPopUp>}

    </>

    )
}

export default HomePage


