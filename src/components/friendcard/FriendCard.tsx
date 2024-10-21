import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { globalVariables } from '@Constants/globalVariables';
import "./FriendCard.scss"

const FriendCard = (props: any) => {
    return (<>
    <div className='flex flex-col'>

        <div className='frnd-card'>
        
        {props.friend.url? (<img 
            src={props.friend.url} 
            alt="Image" 
            className="rq-image" 
            />):
            (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-24" width="100px">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>)}
        <div className='rq-body'>
            <div className='flex flex-row justify-start items-center pl-3'>
                <div className='font-bold text-lg'>{props.friend.name}</div>
            </div>
            <div className='flex flex-row justify-start items-center pt-1 pl-3'>
                <div className='flex flex-col overflow-hidden w-5/10'>
                    <div className='font-semibold text-sm line-clamp-1'>{`EMAIL:  ${props.friend.email}`}</div>
                    <div className='text-xs line-clamp-1'>{`PHONE:  ${props.friend.phone}`}</div>
                </div>

                
            </div>

        </div>
        </div>
        {/* <div className='request-footer'>
            <div className='rq-ft-ch'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" className="size-1" width="20px">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z" />
            </svg>
            <div className='flex tw-flex-col tw-justify-center tw-items-center tw-pl-1'>
             <div className='tw-text-xs'>{formatDate(props.request.from_date)}</div>
            </div>
            </div>
            <div className='rq-ft-ch'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" className="size-1" width="20px">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <div className='tw-flex tw-flex-col tw-justify-center tw-items-center tw-pl-1'>
                    <div className='tw-text-xs'>{`${props.request.from_time.slice(0,-3)} - ${props.request.to_time.slice(0,-3)}`}</div>
                    <div className='tw-text-xs tw-items-center tw-pl-1'>{`${props.request.duration} hrs`}</div>
                </div>
            </div>
            <div className='rq-ft-ch'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" className="size-1" width="20px">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <div className='tw-flex tw-flex-col tw-justify-center tw-items-center tw-pl-1'>
                    <div className='tw-text-xs'>{`${props.request.price}/-`}</div>
                </div>
            </div>
            <div className='rq-ft-ch tw-bg-orangee tw-w-20 tw-rounded-xl tw-cursor-pointer'>

            </div>
        </div> */}
    </div>
        </>
    )
}


export default FriendCard

