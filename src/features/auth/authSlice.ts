// import { IUser } from "@Constants/global-interfaces";
import { LOCAL_STORAGE_DATA_KEYS } from "../../constants/localstorageDataModel";
import { createSlice } from "@reduxjs/toolkit";
import { removeDataFromLocalStorage, setDataOnLocalStorage } from "../../utils/globalUtilities";

export interface IUser {
    id: number,
    name: string,
    email: string,
    phone: string
}

export interface IAuthState {
    user: IUser | null;
    loginError: string;
    isLoggedIn: boolean;
}

const initialState: IAuthState = {
    user: null,
    loginError: "",
    isLoggedIn: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState as IAuthState,
    reducers: {
        logout: (state) => {
            removeDataFromLocalStorage(LOCAL_STORAGE_DATA_KEYS.AUTH_KEY);
            removeDataFromLocalStorage(LOCAL_STORAGE_DATA_KEYS.USER_DETAILS);
            localStorage.clear()
            return { isLoggedIn: false, user: null, loginError: "" }
        }
    }
})

export const { logout } = authSlice.actions;
export default authSlice.reducer;