import { Loader2 } from 'lucide-react'
import React from 'react'

const LoadingPage = () => {
  return (
    <div className='flex justify-center items-center flex-col h-full w-full'>
        <Loader2 className='text-3xl'/>
    </div>
  )
}

export default LoadingPage