import React, { useState } from 'react'
import HeadingDescription from './HeadingDescription'
import Lookup from '@/app/_data/Lookup'
import Colors from '@/app/_data/Colors'

const LogoColorPalatte = ({onHandleInputChange, formData}) => {
    const[selectedoption,setSelectedoption]= useState(formData?.palette);
  return (
    <div className='my-10'>
        <HeadingDescription title={Lookup.LogoColorPaletteTitle} description={Lookup.LogoColorPaletteDesc} />
        <div className='grid grid-cols-2 md:grid-cols-3 gap-5 mt-5'>
            {Colors.map((palette,index)=>(
                <div className={`flex p-1 cursor-pointer ${selectedoption==palette.name && 'border rounded-lg border-primary'}`} key={index}>
                    {palette?.colors.map((color,index)=>(
                        <div className=' h-24 w-full '
                        key={index}
                        onClick={()=>{setSelectedoption(palette.name);
                            onHandleInputChange(palette.name)
                        }}
                        style={{backgroundColor:color}}>
                            </div>
                    ))}
                    </div>
            ))}
        </div>    
    </div>
  )
}

export default LogoColorPalatte