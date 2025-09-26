import { createSlice } from "@reduxjs/toolkit"



const initialState = {
    loggerArr: JSON.parse(localStorage.getItem("users")) || []
}


const loggerSlice = createSlice({
    name: "Log",
    initialState: initialState,
    reducers: {
        addToUsers: (state, action) => {
            state.loggerArr.push(action.payload);
        }
    }
})

export const {addToUsers} = loggerSlice.actions;
export default loggerSlice.reducer;