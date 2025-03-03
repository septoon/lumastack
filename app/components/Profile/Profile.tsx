'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/GlobalRedux/store';
import { logout, loadUser } from '@/app/GlobalRedux/Features/userSlice';
import LoginPage from '../Login/LoginPage';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

const BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_AUTH_BOT_TOKEN || '';

const Profile = () => {
  const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user.user);
    const isLoaded = useSelector((state: RootState) => state.user.isLoaded);

    useEffect(() => {
        dispatch(loadUser());
    }, [dispatch]);

    if (!isLoaded) {
        return <p>Загрузка...</p>;
    }
  return (
    <motion.div initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{
      type: 'spring',
      stiffness: 260,
      damping: 20,
      delay: 0.1,
    }} className="max-w-7xl pt-4 text-black dark:text-white">
      <h2 className="text-md font-unbounded font-bold opacity-50">Личный кабинет</h2>

      <div className='border border-black/10 dark:border-white/10 my-4'></div>
      {
        !user ? (
            <LoginPage />
        ) : (
          <div>
            <p>Имя: <b>{user.first_name} {user.last_name ? user.last_name : ''}</b></p>
            <p>Связь: <b><a target="_blank" href={`https://t.me/${user.username}`} className='underline text-blue'>@{user.username}</a></b> </p>

            <div className='border border-black/10 dark:border-white/10 mt-8 mb-4'></div>
            <button
                onClick={() => dispatch(logout())}
                className="px-4 py-1 bg-gradient-to-tr from-neutral-800/60 via-neutral-950/60 to-neutral-700/60 dark:from-white/50 dark:via-sky-200/60 dark:to-teal-100/60 rounded-md"
            >
                Выйти
            </button>
          </div>
        )
      }
    </motion.div>
  )
}

export default Profile