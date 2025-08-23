import { configureStore } from "@reduxjs/toolkit";
import { coursesSlice, facultySlice, studentsSlice, marksSlice, departmentsSlice, examsSlice, resultsSlice, subjectsSlice } from ".";

const store = configureStore({
    reducer: {
        courses: coursesSlice.reducer,
        faculty: facultySlice.reducer,
        students: studentsSlice.reducer,
        marks: marksSlice.reducer,
        departments: departmentsSlice.reducer,
        exams: examsSlice.reducer,
        results: resultsSlice.reducer,
        subjects: subjectsSlice.reducer,
    }
})

export default store