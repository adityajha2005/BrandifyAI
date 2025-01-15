"use client"
import { useContext } from 'react';
import React from 'react'
import { UserDetailContext } from '../_context/UserDetailContext';
const GenerateLogo = () => {
  const {userDetail,setUserDetail} = useContext(UserDetailContext);
  console.log(userDetail);
  return (
    <div>GenerateLogo</div>
  )
}

export default GenerateLogo