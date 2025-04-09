 
import React from 'react';

const Skeleton = ({boxes ,width}:{boxes?:number , width?:string}) => {
  return (
    <div className={`   items-center justify-center flex flex-col px-3 gap-4 `}>
      {Array.from({ length: boxes! }).map((_, index) => (
        <div
          key={index}
          className={`${width} h-14 rounded-xl relative overflow-hidden`}
        >
          <div
            className={` w-full h-full absolute top-0 left-0 bg-[#37394096]  !delay-1000 -[${index * 0.2}s]  animat e-pulse`}
         
            style={{
              // animationDelay: `${index * 0.2}s`, // Progressive delay based on index
            
                // animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                animation : ` pulse ${index + 3}s cubic-bezier(0.4, 0, 0.6, 1) infinite `,
                
               
            }}
         ></div>
        </div>
      ))}
    </div>
  );
};

export default Skeleton;
