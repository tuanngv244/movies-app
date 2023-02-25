import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUserDetail = createAsyncThunk('auth/fetchUserDetail', async (id: number) => {
  // const res: { data: IUserDetail } = await userApi.getUserDetail({ id: id });
  // return res.data;
  return '';
});
