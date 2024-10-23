import React, { useEffect, useRef, useState } from 'react'
import { Button } from '@mui/material'
import { MODULES_API_MAP, httpService, IAPIResponse } from '../../../services/httpService';
import { GLOBAL_API_ROUTES } from '@Src/services/globalApiRoutes';
import { Navigate, useNavigate } from 'react-router-dom';
import ErrorPopUp from '../../../components/errorPopUp/errorPopUp';


const Profile = (props: any) => {
    const navigate = useNavigate()

    const [email, setEmail] = useState(props.userDetails.email)
    const [name, setName] = useState(props.userDetails.name)
    const [phone, setPhone] = useState(props.userDetails.phone)
    const [image, setImages] = useState<File[]>([])
    const [error, setError] = useState("")
    const [errorPopUp, setErrorPopUp] = useState(false)

	let uploadPictureInputRef: any = useRef<any>(null);

    const onUploadPictureChange = (files: FileList) => {
		const newFiles = Array.from(files).filter(file => {
			return true;
		});

		setImages([...newFiles]);
	};

      const handleUploadClick = (event: any) => {
        uploadPictureInputRef?.current.click();
		event?.preventDefault();// Trigger the file input on button click
      };

      const handleCancelClick = (event: any) => {
        setName(props.userDetails.name)
        setEmail(props.userDetails.email)
        setPhone(props.userDetails.phone)
        setImages([])
      };

      const updateProfile = async()=>{
        const formData: any = new FormData();

        Array.from(image).forEach((file) => {
            formData.append("files", file);          
        })
        formData.append("name", name);
        formData.append("email", email);
        formData.append("phone", phone);

        let response: any = await httpService("http://localhost:6005/wexa","/user").PATCH(formData)
        if(response.apiResponse.data.success){
            props.setUserDetails({id: props.userDetails.id, name: name, email: email, phone: phone, url: response.apiResponse.data.url ? response.apiResponse.data.url : props.userDetails.url, last_log_in: props.userDetails.last_log_in})
            setError(response.apiResponse.data.message)
            setErrorPopUp(true)
            setTimeout(()=>{setErrorPopUp(false)},2000)
        }else{
            if(response.err){
                setError(response.err.response.data.errors[0].message)
                setErrorPopUp(true)
                setTimeout(()=>{setErrorPopUp(false)},2000)
            }
        }
    }

    return (<>
        <div className='flex flex-col'>
            <div className="bd-header pl-6 pr-6">
                <div className='hd-title'>Profile</div>
            </div>
            <div className='bd-body-profile pl-[20px] pr-[20px]'>
                <div className='dp'>
                    { image[0] ? (<img
                            src={URL.createObjectURL(image[0]!)}
                            alt={`Image`}
                            className="dp-img object-cover" 
                        />): (<img
                            src={props.userDetails.url} 
                            alt="Image" 
                            className="dp-img object-cover" 
                        />) }
                    <input
                        ref={uploadPictureInputRef}
                        accept="image/*"
                        onChange={(event: any) => {
                            onUploadPictureChange(event?.target?.files);
                        }}
                        type="file"
                        style={{ display: 'none' }}
                    />
                    <div className='dp-icon'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" className="size-6 cursor-pointer" onClick={handleUploadClick}>
                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                    </svg>
                    </div>
                </div>
                <input type="text" placeholder="Email" className="pro-field placeholder-black" value={email} onChange= {(event)=>setEmail(event.target.value)} />
                <input type="text" placeholder="Name" className="pro-field placeholder-black" value={name} onChange= {(event)=>setName(event.target.value)} />
                <input type="text" placeholder="Phone" className="pro-field placeholder-black" value={phone} onChange= {(event)=>setPhone(event.target.value)} />
                <div className='flex flex-row gap-[10px]'>
                    <text className='pro-but' onClick={handleCancelClick}>Cancel</text>
                    <text className='pro-but' onClick={updateProfile}>Save</text>
                </div>
            </div>
        </div>
        {errorPopUp && <ErrorPopUp error={error} setErrorPopUp={setErrorPopUp}></ErrorPopUp>}
    </>
)
}


export default Profile