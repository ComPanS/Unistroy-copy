import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
    const { data } = await axios.get("/posts");
    return data;
});

const initialState = {
    posts: [],
    postStatus: "loading",
};

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        removePost: (state, action) => {
            state.posts = state.posts.filter(
                (obj) => obj._id !== action.payload
            );
        },
    },
    extraReducers: {
        [fetchPosts.fulfilled]: (state, action) => {
            state.posts = action.payload;
            state.postStatus = "loaded";
        },
        [fetchPosts.pending]: (state, action) => {
            state.posts = [];
            state.postStatus = "loading";
        },
        [fetchPosts.rejected]: (state, action) => {
            state.posts = [];
            state.postStatus = "error";
        },
    },
});

export const postsReducer = postsSlice.reducer;
export const { removePost } = postsSlice.actions;
