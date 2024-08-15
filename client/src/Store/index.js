import { configureStore } from '@reduxjs/toolkit'
import fileReducer from '../Features/Files/file'
import filesListReducer from '../Features/Files/fileList'
import fileDetailLinesReducer from '../Features/Files/fileDetailLines'
import showLoaderReducer from '../Features/Loader/showLoader'
import showLoaderTableReducer from '../Features/Loader/showLoaderTable'

export const store = configureStore({
    reducer: {
        file: fileReducer,
        filesList: filesListReducer,
        fileDetailLines: fileDetailLinesReducer,
        // --------------LOADER-------------------
        showLoader: showLoaderReducer,
        showLoaderTable: showLoaderTableReducer,

    },
})