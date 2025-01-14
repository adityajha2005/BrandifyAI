import React from 'react'
import HeadingDescription from './HeadingDescription'
import Lookup from '@/app/_data/Lookup'

const LogoDesc = ({onHandleInputChange, formData}) => {
  return (
    <div className='my-10'>
        <HeadingDescription title={Lookup.LogoTitleDesc} description={Lookup.LogoDescDesc} />
        <input type='text' placeholder={Lookup.InputTitlePlaceholder}
                className='p-4 border rounded-lg mt-5 w-full'
                defaultValue={formData.desc}
                // defaultValue={title}
                onChange={(e)=>onHandleInputChange(e.target.value)}
                /> 
    </div>
  )
}

export default LogoDesc