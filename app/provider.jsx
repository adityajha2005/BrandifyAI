import React from 'react'
import Header from './_components/Header'

const Provider = ({children}) => {
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