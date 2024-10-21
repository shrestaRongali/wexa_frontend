import { Pagination, styled } from '@mui/material';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export interface IGlobalState {
    loading: boolean;
    theme: 'dark' | 'light';
}

interface Asset {
    asset_guid: string;
}



const initialState: IGlobalState = {
    loading: false,
    theme: 'dark',
};

const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        showSpinner: (state) => {
            state.loading = true;
        },
        hideSpinner: (state) => {
            state.loading = false;
        },
        applyDarkTheme: (state) => {
            state.theme = 'dark';
        },
        applyLightTheme: (state) => {
            state.theme = 'light';
        },
    }
});

export const CustomPagination = styled(Pagination)(({ theme }) => ({
    '& .MuiPaginationItem-page.Mui-selected': {
      backgroundColor: "rgb(223, 156, 100)",
      color: 'white',
    },
  }));

export const { showSpinner, hideSpinner, applyDarkTheme, applyLightTheme } = globalSlice.actions;
export default globalSlice.reducer;
