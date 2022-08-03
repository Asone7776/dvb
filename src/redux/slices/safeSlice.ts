import { createSlice } from "@reduxjs/toolkit";
import { SafesInitialState } from "../../types/safes";
import { cards } from "../../constants";
const initialState: SafesInitialState = {
    data: cards[0]
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
