import { createEntitySlice } from "./createEntitySlice";

const studentsSlice = createEntitySlice("students")

export const { setData: setStudents, addData: addStudents, updateData: updateStudents, deleteData: deleteStudents } = studentsSlice.actions

export default studentsSlice.reducer