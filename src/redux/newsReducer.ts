import { createSlice } from "@reduxjs/toolkit";
import { getNews, getNewsCard, textComments } from "../API/newsAPI";
import type { NewsType } from "../types/news";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type NewsState = {
    data: NewsType[] | null;
    currentNews: NewsType | null;
    comment: NewsType[] | null;
    status: string;
    error: string | null;
}

const initialState:NewsState = {
    data: [],
    currentNews: null,
    comment: [],
    status: 'idle',
    error: null
}


const newsReducer = createSlice({
    name: 'news',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
         builder
         .addCase(getNews.pending, (state) => {
            state.status = 'loading';
    })
       .addCase(getNews.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.data = action.payload
       })
        
        .addCase(getNews.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload as string;
        })
             
             
        .addCase(getNewsCard.pending, (state) => {
            state.status = 'loading';
        })
        
         .addCase(getNewsCard.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.currentNews = action.payload
       })
        
        .addCase(getNewsCard.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload as string;
        })


            .addCase(textComments.pending, (state) => {
            state.status = 'loading';
        })
        
         .addCase(textComments.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.comment = action.payload
       })
        
        .addCase(textComments.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload as string;
        })
    },
    selectors: {
        selectNews: (state) => state.data,
        selectLoading: (state) => state.status,
        selectError: (state) => state.error,
        selectNew: (state) => state.currentNews,
        selectComment: (state) => state.comment
    }

})

export default newsReducer.reducer
export const {selectNews, selectLoading, selectError, selectNew, selectComment} = newsReducer.selectors