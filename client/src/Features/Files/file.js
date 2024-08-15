import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: 0,
}

export const file = createSlice({
    name: 'file',
    initialState,
    reducers: {
        selectedFileTest: (state, action) => {
            state.value = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { selectedFileTest } = file.actions

export default file.reducer