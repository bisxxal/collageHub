import { LuLoader } from "react-icons/lu";
function LoadingCom() {
  return (
    <div className=' rounded-xl inshadow frame p-4 flex w-full h-full '>
        <h1 className=' animate-spin text-lg' >
            <LuLoader />
        </h1>
    </div>
  )
}

export default LoadingCom