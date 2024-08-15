import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: [],
}

export const filesList = createSlice({
    name: 'filesList',
    initialState,
    reducers: {
        arrayAvailableFiles: (state, action) => {
            state.value = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { arrayAvailableFiles } = filesList.actions

export default filesList.reducer