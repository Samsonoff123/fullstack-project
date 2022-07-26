import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "../../redux/axios"

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async ()=>{
    const { data } = await axios.get('posts')
    return data
})

export const fetchPostsDetail = createAsyncThunk('posts/fetchPostsDetail', async (id)=>{
    const { data } = await axios.get(`posts/${id}`)
    return data.comments
})

export const fetchPostsByTag = createAsyncThunk('posts/fetchPostsByTag', async (tagName)=>{
    const { data } = await axios.get(`posts?tagName=${tagName}`)
    return data
})


export const fetchTags = createAsyncThunk('posts/fetchTags', async ()=>{
    const { data } = await axios.get('tags')
    return data
})

export const fetchPopularPosts = createAsyncThunk('posts/fetchPopularPosts', async ()=>{
    const { data } = await axios.get('posts/popular')
    return data
})

export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost', async (id)=>
   axios.delete(`/posts/${id}`)
)

const initialState = {
    posts: {
        items: [],
        status: 'loading',
    },
    tags: {
        items: [],
        status: 'loading',
    }
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducer: {},
    extraReducers: {
        [fetchPosts.pending] : (state)=>{
            state.posts.items = []
            state.posts.status = 'loading'
        },
        [fetchPosts.fulfilled] : (state, action)=>{
            state.posts.items = action.payload
            state.posts.status = 'loaded'
        },
        [fetchPosts.rejected] : (state)=>{
            state.posts.items = []
            state.posts.status = 'error'
        },



        [fetchPostsByTag.pending] : (state)=>{
            state.posts.items = []
            state.posts.status = 'loading'
        },
        [fetchPostsByTag.fulfilled] : (state, action)=>{
            state.posts.items = action.payload
            state.posts.status = 'loaded'
        },
        [fetchPostsByTag.rejected] : (state)=>{
            state.posts.items = []
            state.posts.status = 'error'
        },



        [fetchPopularPosts.pending] : (state)=>{
            state.posts.items = []
            state.posts.status = 'loading'
        },
        [fetchPopularPosts.fulfilled] : (state, action)=>{
            state.posts.items = action.payload
            state.posts.status = 'loaded'
        },
        [fetchPopularPosts.rejected] : (state)=>{
            state.posts.items = []
            state.posts.status = 'error'
        },



        [fetchTags.pending] : (state)=>{
            state.tags.items = []
            state.tags.status = 'loading'
        },
        [fetchTags.fulfilled] : (state, action)=>{
            state.tags.items = action.payload
            state.tags.status = 'loaded'
        },
        [fetchTags.rejected] : (state)=>{
            state.tags.items = []
            state.tags.status = 'error'
        },


        [fetchPostsDetail.pending] : (state)=>{
            state.posts.items = []
            state.posts.status = 'loading'
        },
        [fetchPostsDetail.fulfilled] : (state, action)=>{
            state.posts.items = action.payload
            state.posts.status = 'loaded'
        },
        [fetchPostsDetail.rejected] : (state)=>{
            state.posts.items = []
            state.posts.status = 'error'
        },


        [fetchRemovePost.pending] : (state, action)=>{
            state.posts.items = state.posts.items.filter(obj => obj._id !== action.meta.arg)
        },
    }
})

export const postsReducer = postsSlice.reducer