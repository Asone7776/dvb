import { createSlice } from '@reduxjs/toolkit'
import { savePolicy, updatePolicy, calculatePolicy, deletePolicy, reSendPolicy } from '../actions/policeActions';
import { policeInitialStateType } from '../../types/polices/index';
const initialState: policeInitialStateType = {
    savedPolicy: {
        loading: false,
        data: null,
        error: null,
        success: false
    },
    updatedPolicy: {
        loading: false,
        error: null,
        success: false
    },
    calculatedPolicy: {
        loading: false,
        data: null,
        error: null
    },
    deletedPolicy: {
        loading: false,
        success: false,
        error: null
    },
    reSendedPolicy: {
        loading: false,
        success: false,
        error: null
    },
    holdedPolice: null
}

export const policeSlice = createSlice({
    name: 'police',
    initialState,
    reducers: {
        resetSavedPolicy: (state) => {
            state.savedPolicy.loading = false;
            state.savedPolicy.data = null;
            state.savedPolicy.error = null;
            state.savedPolicy.success = false;
        },
        resetUpdatePolicy: (state) => {
            state.updatedPolicy.loading = false;
            state.updatedPolicy.success = false;
            state.updatedPolicy.error = null;
        },
        resetSaveSuccess: (state) => {
            state.savedPolicy.success = false;
        },
        holdPolice: (state, action) => {
            state.holdedPolice = action.payload;
        },
        resetCalculatedPolicy: (state) => {
            state.calculatedPolicy.loading = false;
            state.calculatedPolicy.data = null;
            state.calculatedPolicy.error = null;
        },
        resetDeletePolice: (state) => {
            state.deletedPolicy.loading = false;
            state.deletedPolicy.success = false;
            state.deletedPolicy.error = null;
        },
        resetReSendPolice: (state) => {
            state.reSendedPolicy.loading = false;
            state.reSendedPolicy.success = false;
            state.reSendedPolicy.error = null;
        },
    },
    extraReducers: (builder) => {
        // Create
        builder.addCase(savePolicy.pending, (state) => {
            state.savedPolicy.loading = true;
            state.savedPolicy.data = null;
            state.savedPolicy.error = null;
            state.savedPolicy.success = false;
        })
        builder.addCase(savePolicy.fulfilled, (state, action) => {
            state.savedPolicy.loading = false;
            state.savedPolicy.data = action.payload;
            state.savedPolicy.error = null;
            state.savedPolicy.success = true;
        })
        builder.addCase(savePolicy.rejected, (state, action) => {
            state.savedPolicy.loading = false;
            state.savedPolicy.data = null;
            state.savedPolicy.error = action.payload;
            state.savedPolicy.success = false;
        })
        // Update
        builder.addCase(updatePolicy.pending, (state) => {
            state.updatedPolicy.loading = true;
            state.updatedPolicy.error = null;
            state.updatedPolicy.success = false;
        })
        builder.addCase(updatePolicy.fulfilled, (state, action) => {
            state.updatedPolicy.loading = false;
            state.updatedPolicy.success = true;
            state.updatedPolicy.error = null;
            state.savedPolicy.loading = false;
            state.savedPolicy.data = action.payload;
            state.savedPolicy.error = null;
            state.savedPolicy.success = true;
        })
        builder.addCase(updatePolicy.rejected, (state, action) => {
            state.updatedPolicy.loading = false;
            state.updatedPolicy.error = action.payload;
            state.updatedPolicy.success = false;
        })
        // calculate
        builder.addCase(calculatePolicy.pending, (state) => {
            state.calculatedPolicy.loading = true;
            state.calculatedPolicy.error = null;
        })
        builder.addCase(calculatePolicy.fulfilled, (state, action) => {
            state.calculatedPolicy.loading = false;
            state.calculatedPolicy.data = action.payload;
            state.calculatedPolicy.error = null;
        })
        builder.addCase(calculatePolicy.rejected, (state, action) => {
            state.calculatedPolicy.loading = false;
            state.calculatedPolicy.error = action.payload;
            state.calculatedPolicy.data = null;
        })
        //Delete
        builder.addCase(deletePolicy.pending, (state) => {
            state.deletedPolicy.loading = true;
            state.deletedPolicy.success = false;
            state.deletedPolicy.error = null;
        })
        builder.addCase(deletePolicy.fulfilled, (state) => {
            state.deletedPolicy.loading = false;
            state.deletedPolicy.success = true;
            state.deletedPolicy.error = null;
        })
        builder.addCase(deletePolicy.rejected, (state, action) => {
            state.deletedPolicy.loading = false;
            state.deletedPolicy.success = false;
            state.deletedPolicy.error = action.payload;
        })
        // Re send
        builder.addCase(reSendPolicy.pending, (state) => {
            state.reSendedPolicy.loading = true;
            state.reSendedPolicy.success = false;
            state.reSendedPolicy.error = null;
        })
        builder.addCase(reSendPolicy.fulfilled, (state) => {
            state.reSendedPolicy.loading = false;
            state.reSendedPolicy.success = true;
            state.reSendedPolicy.error = null;
        })
        builder.addCase(reSendPolicy.rejected, (state, action) => {
            state.reSendedPolicy.loading = false;
            state.reSendedPolicy.success = false;
            state.reSendedPolicy.error = action.payload;
        })
    },
})

export const { resetSavedPolicy, holdPolice, resetSaveSuccess, resetUpdatePolicy, resetCalculatedPolicy, resetDeletePolice, resetReSendPolice } = policeSlice.actions;

export default policeSlice.reducer;