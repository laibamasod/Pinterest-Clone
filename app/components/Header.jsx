"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { HiMagnifyingGlass, HiBell, HiChatBubbleOvalLeftEllipsis } from "react-icons/hi2";
import { useSession, signIn, signOut } from 'next-auth/react';
import { app } from '../Shared/firebaseConfig'
import { doc, getFirestore, setDoc } from "firebase/firestore"
import { useRouter } from 'next/navigation';
function Header() {
    const router = useRouter();
    const { data: session } = useSession()
    const db = getFirestore(app);
    const [activeButton, setActiveButton] = useState('home');
    useEffect(() => {
        saveUserInfo();
        const storedActiveButton = localStorage.getItem('activeButton');
        if (storedActiveButton) {
            setActiveButton(storedActiveButton);
        }
    }, [session])
    const saveUserInfo = async () => {
        if (session?.user) {
            await setDoc(doc(db, "user", session?.user.email), {
                userName: session.user.name,
                email: session.user.email,
                userImage: session.user.image

            });
        }
    }
    const handleNavigation = (path, buttonName) => {
        setActiveButton(buttonName);
        localStorage.setItem('activeButton', buttonName); 
        router.push(path);
    }
    const getButtonClass = (buttonName) => {
        return activeButton === buttonName ? ' bg-black text-white p-2 px-4 rounded-full' : 'font-semibold p-2 px-4 rounded-full';
    }
    const onCreateClick= ()=>{
        if(session){
            handleNavigation('/pin-builder', 'create')
        }else{
signIn();
        }
    }
    return (
        <div className='flex gap-3 md-gap-2 items-center p-6'>
            <Image src='/logo.png' alt='logo' width={50} height={50}
                className='hover:bg-gray-200 p-2 rounded-full cursor-pointer'
                onClick={() => handleNavigation('/', 'home')} />

            <button
                 className={getButtonClass('home')}
                onClick={() => handleNavigation('/', 'home')} >
                Home
            </button>

            <button  className={getButtonClass('create')}
            onClick={()=> onCreateClick()}
                // onClick={() => handleNavigation('/pin-builder', 'create')}
                >
                    Create</button>
            <div className='bg-[#e9e9e9] p-3 flex gap-3 rounded-full w-full cursor-text hidden md:flex'>
                <HiMagnifyingGlass className='text-[25px] text-gray-500 ' />
                <input type='text' placeholder='Search' className='bg-transparent outline-none' />

            </div>
            <HiBell className='text-[40px] text-gray-500' />
            <HiChatBubbleOvalLeftEllipsis className='text-[40px] text-gray-500' />
            {session?.user ?
                <Image src={session?.user?.image} alt='man' width={50} height={50}
                onClick={() => handleNavigation('/' + session.user.email, 'profile')}
                    className='hover:bg-gray-200 p-2 rounded-full cursor-pointer' /> :
                <button onClick={() => signIn()} className=' p-2 px-4 rounded-full'>Login</button>}
        </div>
    )
}

export default Header