import { createEntitySlice } from "./createEntitySlice";

const resultsSlice = createEntitySlice("results")

export const { setData: setResults, addData: addResults, updateData: updateResults, deleteData: deleteResults } = resultsSlice.actions

export default resultsSlice.reducer