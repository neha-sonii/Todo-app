import React from 'react'

const Navbar = () => {
  return (
    <div>
      <nav className='flex justify-around bg-blue-900 text-white py-2'>
        <div className="logo">
          <span className='font-bold text-xl mx-8'>
            iTask
          </span>
        </div>
        <ul className='flex list-none gap-8 mx-10'>
            <li className='cursor-pointer hover:font-bold transition-all transition-3'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all transition-3'>Your Task</li> 
        </ul>
      </nav>
    </div>
  )
}

export default Navbar
