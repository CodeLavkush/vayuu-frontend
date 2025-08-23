import { createEntitySlice } from "./createEntitySlice";

const facultySlice = createEntitySlice("faculty")

export const { setData: setFaculty, addData: addFaculty, updateData: updateFaculty, deleteData: deleteFaculty } = facultySlice.actions

export default facultySlice.reducer