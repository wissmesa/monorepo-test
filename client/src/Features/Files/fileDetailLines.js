import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: [],
}

export const fileDetailLines = createSlice({
    name: 'fileDetailLines',
    initialState,
    reducers: {
        linesOfSelectedFile: (state, action) => {
            state.value = action.payload.file
        },
    },
})

// Action creators are generated for each case reducer function
export const { linesOfSelectedFile } = fileDetailLines.actions

export default fileDetailLines.reducer