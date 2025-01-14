import React, { useState } from 'react';
import Image from 'next/image';
import HeadingDescription from './HeadingDescription';
import Lookup from '@/app/_data/Lookup';
import LogoDesig from '@/app/_data/LogoDesig';

function LogoDesigns({ onHandleInputChange, formData }) {
  const [selectedOption, setSelectedOption] = useState(formData?.design?.title);

  const handleClick = (design) => {
    setSelectedOption(design.title);
    onHandleInputChange(design); 
  };

  return (
    <div className='my-10'>
      <HeadingDescription
        title={Lookup.LogoDesignTitle}
        description={Lookup.LogoDesignDesc}
      />
      <div className='grid grid-cols-2 md:grid-cols-3 gap-10 mt-10'>
        {LogoDesig.map((design, index) => (
          <div
            key={index}
            onClick={() => handleClick(design)} 
            className={`p-1 cursor-pointer hover:border-2 border-primary rounded-xl ${selectedOption === design.title && 'border rounded-xl border-primary'}`}
          >
            <Image
              src={design.image}
              alt={design.title}
              width={300}
              height={200}
              className='w-full rounded-xl h-[150px] object-cover'
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default LogoDesigns;
