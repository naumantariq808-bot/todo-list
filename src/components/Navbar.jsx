import React from 'react'

function Navbar() {
  return (
    <nav className='flex justify-around bg-violet-700 px-5 py-4 text-white'>
        <div className="font-bold text-xl">ITech</div>
        <ul className='flex flex-row gap-10'>
            <li className='font-medium cursor-pointer hover:text-[18px]'>Home </li>
            <li className='font-medium cursor-pointer hover:text-[18px]'>About us</li>
            <li className='font-medium cursor-pointer hover:text-[18px]'>Contact us</li>
        </ul>
    </nav>
  )
}

export default Navbar
