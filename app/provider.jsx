import React from 'react'
import Header from './_components/Header'

const provider = ({children}) => {
  return (
    <div>
        <Header />
        <div className='px-10 lg:px-32 xl:px-48 2xl:xl-56 p-4'>
        {children}
        </div>
    </div>
  )
}

export default provider