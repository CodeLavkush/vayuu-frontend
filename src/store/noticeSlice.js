import { createEntitySlice } from "./createEntitySlice";

const noticeSlice = createEntitySlice("notice")

export const { setData: setNotice, addData: addNotice, updateData: updateNotice, deleteData: deleteNotice } = noticeSlice.actions

export default noticeSlice.reducer