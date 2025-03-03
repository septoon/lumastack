'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/GlobalRedux/store';
import { logout, loadUser } from '@/app/GlobalRedux/Features/userSlice';
import LoginPage from '../components/Login/LoginPage';
import { useState, useEffect } from 'react';
import Header from "../components/Header/Header";

const BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_AUTH_BOT_TOKEN || '';

export default function ProfilePage() {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user.user);
    const isLoaded = useSelector((state: RootState) => state.user.isLoaded);

    const photo = useSelector((state: RootState) => state.user.photo);

    useEffect(() => {
        dispatch(loadUser());
    }, [dispatch]);

    if (!isLoaded) {
        return <p>Загрузка...</p>;
    }

    return (
        <div className="flex flex-col z-10 snap-y snap-mandatory scroll-smooth px-28 sm:px-0">
            <Header isOpen={isOpen} setIsOpen={setIsOpen} />

            <div className="max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
                <h2 className="text-3xl font-unbounded font-bold mb-8">Личный кабинет</h2>
                {
                    !user ? (
                        <LoginPage />
                    ) : (
                        <div>
                            <p>Добро пожаловать, {user.first_name} {user.last_name ? user.last_name : ''}!</p>
                            <p>Номер телефона: {user?.phone_number ? user.phone_number : 'не указан'}</p>

                            <img 
                                src={photo}
                                alt="Аватар" 
                                className="rounded-md w-24 h-24 mt-4"
                                onError={(e) => {
                                    console.warn('Ошибка загрузки фото, заглушка');
                                    e.currentTarget.src = '/default-avatar.webp';
                                }}
                            />

                            <button
                                onClick={() => dispatch(logout())}
                                className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
                            >
                                Выйти
                            </button>
                        </div>
                    )
                }
            </div>
        </div>
    );
}