import React from 'react'
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
function UserInfo({ userInfo }) {
    // console.log(userInfo);

    const router = useRouter();
    const onLogoutClick = async() => {
        await signOut({ redirect: false });
        router.push('/')
    }
    return (
        <div className='  mt-2 flex flex-col items-center'>
            <Image src={userInfo.userImage} width={100} height={100}
                className='rounded-full' alt='userImg' />

            <h2 className='text-[30px] font-semibold'>{userInfo.userName}</h2>
            <h2 className='text-gray-400'>{userInfo.email}</h2>
            <div className='flex gap-4'>
                <button className='bg-gray-200 mt-5 p-2 px-3 rounded-full font-semibold hover:bg-gray-300'>Share</button>
                <button className='bg-gray-200 mt-5 p-2 px-3 rounded-full font-semibold hover:bg-gray-300'
                    onClick={() => onLogoutClick()}>Logout</button>
            </div>
        </div>
    )
}

export default UserInfo