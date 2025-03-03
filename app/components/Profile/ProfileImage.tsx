'use client';

import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/GlobalRedux/store';
import { loadUser } from '@/app/GlobalRedux/Features/userSlice';
import Profile from '../Profile/Profile';
import { AnimatePresence, motion } from 'framer-motion';
import { useClickAway } from 'react-use';

interface HeaderProps {
  isProfileOpen: boolean;
  setIsProfileOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileImage: React.FC<HeaderProps> = ({isProfileOpen, setIsProfileOpen}) => {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const photo = useSelector((state: RootState) => state.user.photo);

  useEffect(() => {
      dispatch(loadUser());
  }, [dispatch]);



  useClickAway(ref, () => setIsProfileOpen(false));

  return (
   <>
    <div ref={ref} className='w-12 h-12 rounded-full bg-white/60 dark:bg-black/60 ml-4 shrink-0 cursor-pointer '>
      <img 
        src={photo}
        alt="Люма Стек - Личный кабинет" 
        className="rounded-full w-12 h-12"
        onClick={() => setIsProfileOpen((prev) => !prev)}
        onError={(e) => {
            console.warn('Ошибка загрузки фото, заглушка');
            e.currentTarget.src = '/default-avatar.webp';
        }}
      />
    </div>
      <AnimatePresence>
      {isProfileOpen && (
        <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
            delay: 0,
          }}
          className="fixed top-24 w-70 right-[5%] rounded-xl shadow-4xl p-4 pt-0 z-50 bg-gradient-to-tr dark:from-neutral-800/90 dark:via-neutral-950/90 dark:to-neutral-700/90 
                  from-white/70 via-sky-200/80 to-teal-100/80">
          <Profile />
        </motion.div>
      )}
      </AnimatePresence>
   </>
  )
}

export default ProfileImage