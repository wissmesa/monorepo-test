import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: false,
}

export const ShowLoaderTable = createSlice({
    name: 'showLoaderTable',
    initialState,
    reducers: {
        isLoadingTable: (state, action) => {
            state.value = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { isLoadingTable } = ShowLoaderTable.actions

export default ShowLoaderTable.reducer