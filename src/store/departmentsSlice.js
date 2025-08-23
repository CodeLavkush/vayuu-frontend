import { createEntitySlice } from "./createEntitySlice";

const departmentsSlice = createEntitySlice("departments")

export const { setData: setDepartments, addData: addDepartments, updateData: updateDepartments, deleteData: deleteDepartments } = departmentsSlice.actions

export default departmentsSlice.reducer