import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { authSlice, coursesSlice, facultySlice, studentsSlice, marksSlice, departmentsSlice, examsSlice, resultsSlice, subjectsSlice, noticeSlice } from ".";
import storage from "redux-persist/lib/storage"
import { persistReducer, persistStore } from "redux-persist";
import {
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist"

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
}

const rootReducer = combineReducers({
    courses: coursesSlice,
    faculty: facultySlice,
    students: studentsSlice,
    marks: marksSlice,
    departments: departmentsSlice,
    exams: examsSlice,
    results: resultsSlice,
    subjects: subjectsSlice,
    auth: authSlice,
    notice: noticeSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware)=>
        getDefaultMiddleware({
            serializableCheck: false,
        })
})

export const persistor = persistStore(store)