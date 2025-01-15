"use client"
import React, { useEffect, useState } from 'react'
import Header from './_components/Header'
import axios from 'axios'
import { useUser } from '@clerk/nextjs'
import { UserDetailContext } from './_context/UserDetailContext'  

const Provider = ({children}) => {
    const {user} = useUser();
    const [userDetail, setUserDetail] = useState();

    useEffect(() => {
        if (user) {
            CheckUserAuth();
        }
    }, [user]);

    const CheckUserAuth = async() => {
        try {
            if (!user?.fullName || !user?.primaryEmailAddress?.emailAddress) {
                console.log("Missing user details");
                return;
            }

            const result = await axios.post('/api/users', {
                userName: user.fullName,
                userEmail: user.primaryEmailAddress.emailAddress 
            });

            console.log("User data saved:", result.data);
            setUserDetail(result.data);
        } catch (error) {
            console.error("Error saving user data:", error.response?.data || error.message);
        }
    }

    return (
        <div>
            <UserDetailContext.Provider value={{userDetail, setUserDetail}}>
                <Header />
                <div className='px-3 lg:px-22 xl:px-8 2xl:xl-56 p-4'>
                    {children}
                </div>
            </UserDetailContext.Provider>
        </div>
    )
}

export default Provider