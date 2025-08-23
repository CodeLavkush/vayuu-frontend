import { createEntitySlice } from "./createEntitySlice";

const subjectsSlice = createEntitySlice("subjects")

export const { setData: setSubjects, addData: addSubjects, updateData: updateSubjects, deleteData: deleteSubjects } = subjectsSlice.actions

export default subjectsSlice.reducer