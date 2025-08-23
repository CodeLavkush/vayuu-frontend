import { createEntitySlice } from "./createEntitySlice";

const examsSlice = createEntitySlice("exams")

export const { setData: setExams, addData: addExams, updateData: updateExams, deleteData: deleteExams } = departmentsSlice.actions

export default examsSlice.reducer