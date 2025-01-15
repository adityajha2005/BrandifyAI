"use client"
import React, { useEffect } from 'react'
import Header from './_components/Header'
import axios from 'axios'
import { useUser } from '@clerk/nextjs'

const Provider = ({children}) => {
    //saving user data to database
    const{user} = useUser();
    useEffect(()=>{
        user&&CheckUserAuth();
    },[user])
    const CheckUserAuth = async() => {
      const result = await axios.post('/api/user',{
        userName : user?.fullName,
        userEmail:user?.primaryEmailAddress?.emailAddress 
      });
      console.log(result.data);
    }
  return (
    <div>
        <Header />
        <div className='px-3 lg:px-22 xl:px-8 2xl:xl-56 p-4'>
        {children}
        </div>
    </div>
  )
}

export default Provider