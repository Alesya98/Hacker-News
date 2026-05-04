import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { NewsType } from "../types/news";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getNews = createAsyncThunk("news/get", async (_, thunkAPI) => {
  try {
    const response = await axios.get<number[]>(`${BASE_URL}topstories.json`);

    const requests = response.data.map((id: number) =>
      axios.get<NewsType>(`${BASE_URL}/item/${id}.json`),
    );

    const promise = await Promise.all(requests);
    const news = promise.map((item) => item.data);

    return news;
  } catch (e) {
    const error = e as { message: string };
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const textComments = createAsyncThunk(
  "news/comments",
  async (commentIds: number[], thunkAPI) => {
    try {
      const requests = commentIds.map((id) =>
        axios.get(`${BASE_URL}/item/${id}.json`),
      );

      const promise = await Promise.all(requests);
      const comment = promise.map((item) => item.data);

      return comment;
    } catch (e) {
      const error = e as { message: string };
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const kidsComments = createAsyncThunk(
  "news/kidsComments",
  async (kidsComments: number[], thunkAPI) => {
    try {
      const requests = kidsComments.map((id) =>
        axios.get(`${BASE_URL}/item/${id}.json`),
      );

      const responses = await Promise.all(requests);

      return responses.map((item) => item.data);
    } catch (e) {
      const error = e as { message: string };
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
