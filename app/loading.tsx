import React from 'react'
import { LuLoader } from 'react-icons/lu'

const loading = () => {

  return (
    <div className={`w-full h-screen sidebarbg flex items-center justify-center `}>

      <div className=' flex flex-col items-center justify-center  '>
        <h1 className=' flex items-center gap-1 text-5xl max-md:text-4xl font-bold mb-3 animate-pulse  '>College <span className='  rounded-xl block p-2 ml-1 bg-[#F7971D] '>Hub</span></h1>
        <h1 className=' animate-spin text-xl mt-5 text-gray-500' >
            <LuLoader size={24}/>
        </h1>
      </div>
    </div>
  )
}

export default loading
