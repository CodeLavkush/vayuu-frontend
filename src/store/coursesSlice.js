import { createEntitySlice } from "./createEntitySlice";

const coursesSlice = createEntitySlice("courses")

export const { setData: setCourses, addData: addCourses, updateData: updateCourses, deleteData: deleteCourses } = coursesSlice.actions


export default coursesSlice.reducer