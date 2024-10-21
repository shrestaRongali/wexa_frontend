import React, { useEffect, useState } from 'react'
import "./LandingPage.scss"
import { httpService, IAPIResponse } from '../../services/httpService';
import { useNavigate } from 'react-router-dom';
import { setDataOnLocalStorage } from '../../utils/globalUtilities';
import { LOCAL_STORAGE_DATA_KEYS } from '../../constants/localstorageDataModel';
import ErrorPopUp from '../../components/errorPopUp/errorPopUp';


const LandingPage = (props: any) => {
    const navigate = useNavigate()

    const [isLogin, setLoginState] = useState(true)
    const [username, setUsernameState] = useState("")
    const [name, setNameState] = useState("")
    const [email, setEmailState] = useState("")
    const [phone, setPhoneState] = useState("")
    const [password, setPasswordState] = useState("")
    const [confirmPassword, setConfirmPasswordState] = useState("")
    const [authError, setAuthErrorState] = useState("error")
    const [authStep, setAuthStepState] = useState(1)
    const [otp, setOTPState] = useState("")
    const [error, setError] = useState("")
    const [errorPopUp, setErrorPopUp] = useState(false)

    const handleLoginClick = () => {
        setLoginState(true);
    };

    const handleSignupClick = () => {
        setLoginState(false);
    };
    
    useEffect(() => {
        setUsernameState("")
        setNameState("")
        setEmailState("")
        setPasswordState("")
        setConfirmPasswordState("")
        setOTPState("")
        setPhoneState("")
        setAuthErrorState("")
        setAuthStepState(1)
    }, [isLogin, authError]);

    const submitLogin = async () => {
            try {
                let requestObj = {
                    username: username,
                    password: password,
                }

                let response: any = await httpService("http://localhost:6005/wexa","/login").POST(requestObj)
                if (response.apiResponse) {
                    setDataOnLocalStorage(
                        LOCAL_STORAGE_DATA_KEYS.AUTH_KEY,
                        response.apiResponse.data.data.key
                    );
                    navigate(`/home`)
                }
                if(response.err){
                    setError(response.err.response.data.errors[0].message)
                    setErrorPopUp(true)
                    setTimeout(()=>{setErrorPopUp(false)},2000)
                }
            }catch(error: any) {
                console.error(error)
            }
    }

    const sendSignupOtp = async ()=>{
        try{
            let requestObj = {
                phone: phone,
                email: email
            }
            let response = await httpService("http://localhost:6005/wexa","/signup/otp").POST(requestObj)
            if (response.apiResponse) {
                setAuthStepState(2)
            }if(response.err.response.data.errors[0].message === "Email/Mobile number already in use"){
                setAuthStepState(1)
                setNameState("")
                setPhoneState("")
                setEmailState("")
                setOTPState("")
                setPasswordState("")
                setConfirmPasswordState("")
               }
               if(response.err){
                setError(response.err.response.data.errors[0].message)
                setErrorPopUp(true)
                setTimeout(()=>{setErrorPopUp(false)},2000)
            }
        }catch(error: any){
            console.log(error.message)
            console.error(error)
        }
    }
    
    const submitOtp = async ()=>{
        try{
            setAuthStepState(3)
        }catch(error: any){
            console.log(error.message)
            console.error(error)
        }
    }

    const submitSignup = async ()=>{
            let requestObj = {
                phone: phone,
                email: email,
                name: name,
                otp: otp,
                password: password,
                confirmPassword: confirmPassword
            }
            let response = await httpService("http://localhost:6005/wexa","/signup").POST(requestObj)
            try {
                if (response.apiResponse) {
                    setAuthStepState(4)
                    setDataOnLocalStorage(
                    LOCAL_STORAGE_DATA_KEYS.AUTH_KEY,
                    response.apiResponse.data.data.key
                );
                navigate(`/home`)
                }else{
                    if(response.err){
                        setError(response.err.response.data.errors[0].message)
                        setErrorPopUp(true)
                        setTimeout(()=>{setErrorPopUp(false)},2000)
                    }
                    if(response.err.response.data.errors[0].message === "Invalid OTP"){
                        setAuthStepState(2)
                        setOTPState("")
                        setPasswordState("")
                        setConfirmPasswordState("")
                    }
                    if(response.err.response.data.errors[0].message ==="Password mismatch"){
                        setAuthStepState(3)
                        setPasswordState("")
                        setConfirmPasswordState("")
                    }
                }
                    
                } catch (e: any) {
               
            }
    }

    return (<>
    <div className="h-screen w-full flex flex-col">
        <div className='wel'>Welcome</div>
        <div className='auth'>
            <div className='lgsn'>
                <div className={`b ${isLogin == true? 'active' : ''}`} onClick={handleLoginClick}>LOGIN</div>
                <div className={`b ${isLogin == false? 'active' : ''}`} onClick={handleSignupClick}>SIGNUP</div>
            </div>
            <div className="form-fields">
                    {isLogin && authStep == 1 &&(
                        <>
                            <input type="text" placeholder="Email/Phone" className="input-field placeholder-black" value={username} onChange= {(event)=>setUsernameState(event.target.value)}/>
                            <input type="password" placeholder="Password" className="input-field placeholder-black" value={password} onChange= {(event)=>setPasswordState(event.target.value)} />
                        </>
                        
                    )}
                    {!isLogin && authStep == 1 && (
                        <>
                            <input type="text" placeholder="Name" className="input-field placeholder-black" value={name} onChange= {(event)=>setNameState(event.target.value)} />
                            <input type="email" placeholder="Email" className="input-field placeholder-black" value={email} onChange= {(event)=>setEmailState(event.target.value)}/>
                            <input type="text" placeholder="Phone" className="input-field placeholder-black" value={phone} onChange= {(event)=>setPhoneState(event.target.value)}/>
                        </>
                    )}
                    {!isLogin && authStep==2 && (
                        <>
                            <input type="text" placeholder="OTP" className="input-field placeholder-black" value={otp} onChange= {(event)=>setOTPState(event.target.value)} />
                        </>
                    )}
                    {!isLogin && authStep==3 && (
                        <>
                            <input type="password" placeholder="Password" className="input-field placeholder-black" value={password} onChange= {(event)=>setPasswordState(event.target.value)} />
                            <input type="password" placeholder="Confirm Password" className="input-field placeholder-black" value={confirmPassword} onChange= {(event)=>setConfirmPasswordState(event.target.value)} />
                        </>
                    )}
                    {!isLogin && authStep==4 && (
                        <>
                        <div>SIGNUP SUCCESSFUL</div>
                        <div className='but' onClick={handleLoginClick}>Login</div>
                        </>
                    )}
            </div>
            {isLogin && (
                <>
                <div className='but' onClick={submitLogin}>SUBMIT</div>
                </>
            )}
            {!isLogin && authStep===1 && (
                <>
                <div className='but' onClick={sendSignupOtp}>SEND OTP</div>
                </>
            )}
            {!isLogin && authStep===2 && (
                <>
                <div className='but' onClick={submitOtp}>VERIFY</div>
                </>
            )}
            {!isLogin && authStep===3 && (
                <>
                <div className='but' onClick={submitSignup}>SUBMIT</div>
                </>
            )}
        </div>
    </div>
    {errorPopUp && <ErrorPopUp error={error} setErrorPopUp={setErrorPopUp}></ErrorPopUp>}
</>
    )
}


export default LandingPage