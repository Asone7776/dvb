import { createSlice } from "@reduxjs/toolkit";
import { tariffs } from "../../constants";
import { SafesInitialState } from "../../types/safes";
const initialState: SafesInitialState = {
    data: tariffs[0]
}
//TODO: Remove default value
const safeSlice = createSlice({
    name: 'safe',
    initialState,
    reducers: {
        saveItem: (state, action) => {
            state.data = action.payload;
        },
        resetSafe: (state) => {
            state.data = null;
        }
    }
});
export const { resetSafe, saveItem } = safeSlice.actions;
export default safeSlice.reducer;
