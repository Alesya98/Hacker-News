import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getNews, kidsComments, textComments } from "../API/newsAPI";
import type { NewsType } from "../types/news";

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

type NewsState = {
  data: NewsType[] | null;
  currentNews: NewsType | null;
  comment: NewsType[] | null;
  status: string;
  error: string | null;
  kidsComment: NewsType[] | null;
};

const initialState: NewsState = {
  data: [],
  currentNews: null,
  comment: [],
  status: "idle",
  error: null,
  kidsComment: [],
};

const newsReducer = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNews.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })

      .addCase(textComments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.comment = action.payload;
      })

      .addCase(kidsComments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.kidsComment = action.payload;
      })

      .addMatcher(
        (action) =>
          action.type.endsWith("/pending") &&
          !action.type.includes("kidsComments"),
        (state) => {
          state.status = "loading";
        },
      )

      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action: PayloadAction<string>) => {
          state.status = "failed";
          state.error = action.payload as string;
        },
      );
  },
  selectors: {
    selectNews: (state) => state.data,
    selectLoading: (state) => state.status,
    selectError: (state) => state.error,
    selectNew: (state) => state.currentNews,
    selectComment: (state) => state.comment,
  },
});

export default newsReducer.reducer;
export const {
  selectNews,
  selectLoading,
  selectError,
  selectNew,
  selectComment,
} = newsReducer.selectors;
