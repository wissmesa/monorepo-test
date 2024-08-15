import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: false,
}

export const ShowLoader = createSlice({
    name: 'showLoader',
    initialState,
    reducers: {
        isLoading: (state, action) => {
            state.value = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { isLoading } = ShowLoader.actions

export default ShowLoader.reducer