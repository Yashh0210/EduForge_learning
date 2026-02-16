import React, { useContext } from 'react';
import { assets } from '../../assets/assets';
import { Link, useLocation } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { toast } from 'react-toastify';
import axios from 'axios';

const Navbar = () => {

  const location = useLocation();

  const isCoursesListPage = location.pathname.includes('/course-list');

  const { backendUrl, isEducator, setIsEducator, navigate, getToken } = useContext(AppContext)

  const { openSignIn } = useClerk()
  const { user } = useUser()

  const becomeEducator = async () => {

    try {

      if (isEducator) {
        navigate('/educator')
        return;
      }

      const token = await getToken()
      const { data } = await axios.get(backendUrl + '/api/educator/update-role', { headers: { Authorization: `Bearer ${token}` } })
      if (data.success) {
        toast.success(data.message)
        setIsEducator(true)
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-forge-border py-4 bg-white sticky top-0 z-50">
      <h1 onClick={() => navigate('/')} className="text-2xl lg:text-3xl font-bold text-forge-signal cursor-pointer font-display tracking-tight">EduForge</h1>
      <div className="md:flex hidden items-center gap-5 text-gray-500">
        <div className="flex items-center gap-5">
          {
            user && <>
              <button onClick={becomeEducator} className="hover:text-forge-signal transition-colors duration-150">{isEducator ? 'Educator dashboard' : 'Teach on EduForge'}</button>
              | <Link to='/my-enrollments' className="hover:text-forge-signal transition-colors duration-150">My learning</Link>
            </>
          }
        </div>
        {user
          ? <UserButton />
          : <button onClick={() => openSignIn()} className="bg-forge-signal text-white px-5 py-2 rounded-btn hover:bg-indigo-700 transition-colors duration-150">
            Get started
          </button>}
      </div>
      {/* For Phone Screens */}
      <div className='md:hidden flex items-center gap-2 sm:gap-5 text-gray-500'>
        <div className="flex items-center gap-1 sm:gap-2 max-sm:text-xs">
          <button onClick={becomeEducator} className="hover:text-forge-signal transition-colors duration-150">{isEducator ? 'Educator dashboard' : 'Teach on EduForge'}</button>
          | {
            user && <Link to='/my-enrollments' className="hover:text-forge-signal transition-colors duration-150">My learning</Link>
          }
        </div>
        {user
          ? <UserButton />
          : <button onClick={() => openSignIn()}>
            <img src={assets.user_icon} alt="" />
          </button>}
      </div>
    </div>
  );
};

export default Navbar;