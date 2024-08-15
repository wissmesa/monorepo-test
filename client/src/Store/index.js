import { configureStore } from '@reduxjs/toolkit'
import fileReducer from '../Features/Files/file'
import filesListReducer from '../Features/Files/fileList'
import fileDetailLinesReducer from '../Features/Files/fileDetailLines'

export const store = configureStore({
    reducer: {
        file: fileReducer,
        filesList: filesListReducer,
        fileDetailLines: fileDetailLinesReducer
    },
})