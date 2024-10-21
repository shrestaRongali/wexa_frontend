import React, { useEffect, useState } from 'react'
import { MODULES_API_MAP, httpService , IAPIResponse} from '../../../services/httpService';
import { Navigate, useNavigate } from 'react-router-dom';
import { CustomPagination, showSpinner } from '../../../features/global/globalSlice';
import FriendCard from '../../../components/friendcard/FriendCard';

export interface ICT {
    id: number,
    name: string,
    email: string,
    phone: string,
    address_1: string,
    address_2: string,
    city: string,
    state: string,
    pin: string,
    country: string,
    rate_per_hour: number,
    url: string,
    user_id: number
}

function formatDate(dateString: any) {
    const options: Intl.DateTimeFormatOptions  = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
}


const Home = (props: any) => {
    const navigate = useNavigate()

    const [search, setSearch] = useState<string | undefined>()
    const [friends, setFriends] = useState<any[] | []>([])
    const [page, setPage] = useState<number>(1)
    const [pageCount, setPageCount] = useState<number>(1)

    const getData = async()=>{
        let query = `&page=${page}`
        if(search){
            query+=`search=${search}`
        }
        let response: any = await httpService("http://localhost:6005/wexa",`/friends?limit=12${query}`).GET()
        if (response.apiResponse.data.success) {
            setFriends(response.apiResponse.data.data)
            let pageCount = Math.ceil(response.apiResponse.data.data.count / 12);
            setPageCount(pageCount)
        }
    }

    const paginationCall = (event: any, value: any) => {
        setPage(value)
    }

    useEffect(()=>{
        getData()
    },[page, search])

    return (<>
        <div className='flex flex-col p-7'>
            <div className="bd-header pl-6 pr-6">
                <div className='hd-title'>Welcome to WEXA!</div>
                <div>{`Last Logged in: ${formatDate(props.userDetails.last_log_in)}`}</div>
            </div>
            <div className='mesg'>
            We're excited to have you here! 🌟 This is a place where you can meet new friends, connect with people who share your interests, and chat to your heart's content.
            </div>
            <div className="bd-header pl-6 pr-6">
                <div className='hd-title text-sm'>Friend List</div>
            </div>
            <div className='bd-body-requests pl-[20px] pr-[20px]'>
                { friends && (friends.map((friend: any, index: any) => (
                    <FriendCard
                        friend={friend}
                        index={index}
                    />
                )))}
                </div>
            {pageCount>1 && (<div className='flex justify-center items-center w-full pt-4 pb-4'>
                <CustomPagination onChange={paginationCall} page={page} count={pageCount} />
            </div>)}
        </div>
    </>
)
}


export default Home 