import React, { useEffect, useState } from 'react'
import { MODULES_API_MAP, httpService, IAPIResponse } from '../../../services/httpService';
import { Navigate, useNavigate } from 'react-router-dom';
import { CustomPagination} from '../../../features/global/globalSlice';
import FriendCard from '../../../components/friendcard/FriendCard';
// import RequestCard from '@Components/requestcard/RequestCard';

export interface IFriend{
    id: number,
    name: string,
    email: string,
    phone: string,
    url: string,
    updated_at: string
}

const Requests = (props: any) => {
    const navigate = useNavigate()

    const [search, setSearch] = useState<string | undefined>()
    const [friends, setFriends] = useState<IFriend[] | []>([])
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
            // let pageCount = Math.ceil(response.apiResponse.data.data.totalCount / 12);
            // setPageCount(pageCount)
            console.log(friends,"kljhgtfu6yuhjb")
        }
    }

    const paginationCall = (event: any, value: any) => {
        setPage(value)
    }

    useEffect(()=>{
        getData()
    },[page])

    // useEffect(()=>{
    //     getData()
    // },[])

    return (
    <>
        <div className='flex flex-col'>
        <div className="bd-header pl-6 pr-6">
                <div className='hd-title'>Friends</div>
                <div className='hd-search flex flex-row justify-between p-3'>
                    <input type="text" placeholder="Search" className="bg-light-grey w-full focus:border-none " value={search}/>    
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6" width="20" height="20">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </div>
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


export default Requests