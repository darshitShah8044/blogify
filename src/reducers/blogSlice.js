import {createSlice} from "@reduxjs/toolkit";

// --- Load blogs from localStorage (if any)
const storedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];

const initialState = {
    blogs: storedBlogs,
};

// --- Helper function to sync state with localStorage
const saveToLocalStorage = (blogs) => {
    localStorage.setItem("blogs", JSON.stringify(blogs));
};

const blogSlice = createSlice({
    name: "blogs",
    initialState,
    reducers: {
        addBlog: (state, action) => {
            const newBlog = {
                id: Date.now(),
                title: action.payload.title,
                content: action.payload.content,
                category: action.payload.category,
                tags: action.payload.tags,
                status: action.payload.status || "Draft",
                createdAt: new Date().toISOString(),
            };
            state.blogs.push(newBlog);
            saveToLocalStorage(state.blogs);
        },

        editBlog: (state, action) => {
            const index = state.blogs.findIndex((b) => b.id === action.payload.id);
            if (index !== -1) {
                state.blogs[index] = {...state.blogs[index], ...action.payload};
                saveToLocalStorage(state.blogs);
            }
        },

        deleteBlog: (state, action) => {
            state.blogs = state.blogs.filter((b) => b.id !== action.payload);
            saveToLocalStorage(state.blogs);
        },

        clearBlogs: (state) => {
            state.blogs = [];
            localStorage.removeItem("blogs");
        },
    },
});

export const {addBlog, editBlog, deleteBlog, clearBlogs} = blogSlice.actions;
export default blogSlice.reducer;
