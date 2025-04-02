 
import React from 'react';

const Skeleton = ({boxes ,width}:{boxes?:number , width?:string}) => {
  return (
    <div className={`   items-center justify-center flex flex-col px-3 gap-4 `}>
      {Array.from({ length: boxes! }).map((_, index) => (
        <div
          key={index}
          className={`${width} h-14 rounded-xl bg-[#222233] relative overflow-hidden`}
        >
          <div
            className={` w-full h-full absolute top-0 left-0 bg-gradient-to-r from-[#222233] via-[#3e3e57] to-[#222233]  pulseShimmer`}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default Skeleton;
