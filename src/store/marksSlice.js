import { createEntitySlice } from "./createEntitySlice";

const marksSlice = createEntitySlice("marks")

export const { setData: setMarks, addData: addMarks, updateData: updateMarks, deleteData: deleteMarks } = marksSlice.actions

export default marksSlice.reducer