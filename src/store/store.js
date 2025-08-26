import { configureStore } from "@reduxjs/toolkit";
import { authSlice, coursesSlice, facultySlice, studentsSlice, marksSlice, departmentsSlice, examsSlice, resultsSlice, subjectsSlice } from ".";

const store = configureStore({
    reducer: {
        courses: coursesSlice,
        faculty: facultySlice,
        students: studentsSlice,
        marks: marksSlice,
        departments: departmentsSlice,
        exams: examsSlice,
        results: resultsSlice,
        subjects: subjectsSlice,
        auth: authSlice,
    }
})

export default store