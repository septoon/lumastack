import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  phone_number?: string;
  photo_url?: string;
  auth_date: number;
  hash: string;
}

interface UserState {
  user: TelegramUser | null;
  photo: string;
  isLoaded: boolean;
}

const initialState: UserState = {
  user: null,
  photo: '/default-avatar.webp',
  isLoaded: false,
};

const BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_AUTH_BOT_TOKEN || '';

export const fetchTelegramPhoto = createAsyncThunk(
  'user/fetchTelegramPhoto',
  async (userId: number, { rejectWithValue }) => {
    try {
      if (!BOT_TOKEN) {
        console.error('Bot token отсутствует');
        return rejectWithValue('Bot token отсутствует');
      }

      console.log(`[fetchTelegramPhoto] Запрос фото для user_id: ${userId}`);
      
      const photoResponse = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getUserProfilePhotos?user_id=${userId}&limit=1`);
      const photoData = await photoResponse.json();

      console.log(`[fetchTelegramPhoto] Ответ от API (getUserProfilePhotos):`, photoData);

      if (!photoData.ok || photoData.result.total_count === 0) {
        console.error('[fetchTelegramPhoto] Фото не найдено');
        return rejectWithValue('Фото не найдено');
      }

      const fileId = photoData.result.photos[0][0].file_id;
      console.log(`[fetchTelegramPhoto] file_id найден: ${fileId}`);

      const fileResponse = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getFile?file_id=${fileId}`);
      const fileData = await fileResponse.json();

      console.log(`[fetchTelegramPhoto] Ответ от API (getFile):`, fileData);

      if (!fileData.ok) {
        console.error('[fetchTelegramPhoto] Ошибка получения фото');
        return rejectWithValue('Ошибка получения фото');
      }

      const photoUrl = `https://api.telegram.org/file/bot${BOT_TOKEN}/${fileData.result.file_path}`;
      console.log(`[fetchTelegramPhoto] Финальный URL фото: ${photoUrl}`);

      return photoUrl;
    } catch (error) {
      console.error('[fetchTelegramPhoto] Ошибка запроса:', error);
      return rejectWithValue('Ошибка запроса к Telegram API');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TelegramUser>) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
      
      if (action.payload.photo_url) {
        state.photo = action.payload.photo_url;
        localStorage.setItem('user_photo', action.payload.photo_url);
      }
      
      state.isLoaded = true;
    },
    logout: (state) => {
      state.user = null;
      state.photo = '/default-avatar.webp';
      localStorage.removeItem('user');
      localStorage.removeItem('user_photo');
      state.isLoaded = true;
    },
    loadUser: (state) => {
      if (typeof window !== 'undefined') {
        const storedUser = localStorage.getItem('user');
        const storedPhoto = localStorage.getItem('user_photo');

        state.user = storedUser ? JSON.parse(storedUser) : null;
        state.photo = storedPhoto || '/default-avatar.webp';
      }
      state.isLoaded = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTelegramPhoto.fulfilled, (state, action) => {
        state.photo = action.payload;
        localStorage.setItem('user_photo', action.payload); // ✅ Сохраняем в localStorage
      })
      .addCase(fetchTelegramPhoto.rejected, (state) => {
        state.photo = '/default-avatar.webp';
      });
  },
});

export const { setUser, logout, loadUser } = userSlice.actions;
export default userSlice.reducer;