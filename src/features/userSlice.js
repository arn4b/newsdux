import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        isSignedin: false,
        userData: null,
        searchInput: "tech",
        blogData: null,
    },
    reducers: {
        setSignedIn: (state, action) => {
            state.isSignedin = action.payload;
        },
        setUserData: (state, action) => {
            state.userData = action.payload;
        },
        setSearchInput: (state, action) => {
            state.searchInput = action.payload;
        },
        setBlogData: (state, action) => {
            state.blogData = action.payload;
        }
    }
})

export const {setSignedIn, setUserData, setSearchInput, setBlogData,} = userSlice.actions;

export const selectSignedin = (state) => state.user.isSignedin;
export const selectUserData = (state) => state.user.userData;
export const selectSearchInput = (state) => state.user.searchInput;
export const selectBlogData = (state) => state.user.blogData;

export default userSlice.reducer;

