import React from 'react'

const Skeleton = ({arraySkeleton}) => {
  return (
    <>
    <div className='flex gap-4 w-full justify-center px-2 flex-wrap'>
{Array(arraySkeleton).fill(0).map((_, index) => (
      <div className="flex w-52 flex-col gap-4 justify-center">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
      </div>
))}
    </div>
    </>
  )
}

export default Skeleton