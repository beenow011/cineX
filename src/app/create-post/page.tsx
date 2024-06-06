import DialogComponent from '@/components/DialogComponent'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import React from 'react'

function page() {
  return (
    <div>
      <MaxWidthWrapper className="px-0 mx-auto mt-5 max-w-7xl md:p-8">
        <div className=' flex  justify-center  bg-cyan-500/70 h-[700px] p-4 rounded-lg'>
          <DialogComponent />
        </div>
      </MaxWidthWrapper>
    </div>
  )
}

export default page