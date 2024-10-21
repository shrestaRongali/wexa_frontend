import { LOCAL_STORAGE_DATA_KEYS } from "../constants/localstorageDataModel";
import { getDataFromLocalStorage, removeDataFromLocalStorage } from "../utils/globalUtilities";
import axios from "axios";

export const MODULES_API_MAP = {

    AUTHENTICATION: process.env.REACT_APP_UNIVERZE_BASE_API_URL,

}

export interface IAPIResponse{
    apiResponse: any | undefined,
    err: any | undefined
}

export function httpService(moduleBaseApiUrl: string | undefined = "", endpoint: string, showErrorToast = true, requireAuth = true, customHeaders: any = undefined, rawResponse = false, signal?: AbortSignal) {
    const httpInstance = axios.create({});
    if (requireAuth) {
        httpInstance.interceptors.request.use((config) => {
            let key = getDataFromLocalStorage(LOCAL_STORAGE_DATA_KEYS.AUTH_KEY);
            config.headers['key'] = key;
            config.baseURL = moduleBaseApiUrl;
            return config;
        });
    }

    async function GET() {
        try {
            let config: any = {};
            if (signal) {
                config["signal"] = signal;
            }
            let apiResponse = await httpInstance.get<IAPIResponse, any>(endpoint, { ...config });
            if (rawResponse) {
                return apiResponse;
            }
            return {apiResponse};
        } catch (err: any) {
                if (err?.response.data.errors && err?.response.data?.errors[0]?.message === 'Not authorized') {
                    removeDataFromLocalStorage(LOCAL_STORAGE_DATA_KEYS.AUTH_KEY);
                    removeDataFromLocalStorage(LOCAL_STORAGE_DATA_KEYS.USER_DETAILS);
                    localStorage.clear()
                    window.location.href = '/'
                }
            return {err}
        }
    }

    async function POST(requestObject: any) {
        try {
            let config: any = {};
            if (signal) {
                config["signal"] = signal;
            }
            let apiResponse = await httpInstance.post<IAPIResponse, any>(endpoint, requestObject, { ...config });
            if (rawResponse) {
                return {apiResponse};
            }
            return {apiResponse};
        } catch (err: any) {
            console.log(err)
            if (err?.response.data.errors && err?.response.data?.errors[0]?.message === 'Not authorized') {
                removeDataFromLocalStorage(LOCAL_STORAGE_DATA_KEYS.AUTH_KEY);
                removeDataFromLocalStorage(LOCAL_STORAGE_DATA_KEYS.USER_DETAILS);
                localStorage.clear()
                window.location.href = '/'
                
            }
        return {err}
        }
    }

    async function PUT(requestObject: any) {
        try {
            let config: any = {};
            if (signal) {
                config["signal"] = signal;
            }
            let apiResponse = await httpInstance.put<IAPIResponse, any>(endpoint, requestObject, { ...config });
            if (rawResponse) {
                return apiResponse;
            }
            return {apiResponse};
        } catch (err: any) {
                if (err?.response.data.errors && err?.response.data?.errors[0]?.message === 'Not authorized') {
                    removeDataFromLocalStorage(LOCAL_STORAGE_DATA_KEYS.AUTH_KEY);
                    removeDataFromLocalStorage(LOCAL_STORAGE_DATA_KEYS.USER_DETAILS);
                    localStorage.clear()
                    window.location.href = '/'

                }
            return {err}
        }
    }

    async function DELETE() {
        try {
            let config: any = {};
            if (signal) {
                config["signal"] = signal;
            }
            let apiResponse = await httpInstance.delete<IAPIResponse, any>(endpoint, { ...config });
            if (rawResponse) {
                return apiResponse;
            }
            return {apiResponse}
        } catch (err: any) {
                if (err?.response.data.errors && err?.response.data?.errors[0]?.message === 'Not authorized') {
                    removeDataFromLocalStorage(LOCAL_STORAGE_DATA_KEYS.AUTH_KEY);
                    removeDataFromLocalStorage(LOCAL_STORAGE_DATA_KEYS.USER_DETAILS);
                    localStorage.clear()
                    window.location.href = '/'

                }
            return {err}
        }
    }

    async function PATCH(requestObject?: any) {
        try {
            let config: any = {};
            if (signal) {
                config["signal"] = signal;
            }
            let apiResponse = await httpInstance.patch<IAPIResponse, any>(endpoint, requestObject, { ...config });
            if (rawResponse) {
                return apiResponse;
            }
            return {apiResponse}
        } catch (err: any) {
            if (err?.response.data.errors && err?.response.data?.errors[0]?.message === 'Not authorized') {
                removeDataFromLocalStorage(LOCAL_STORAGE_DATA_KEYS.AUTH_KEY);
                removeDataFromLocalStorage(LOCAL_STORAGE_DATA_KEYS.USER_DETAILS);
                localStorage.clear()
                window.location.href = '/'

            }
            return {err}
        }
    }

    return { GET, POST, PUT, PATCH, DELETE }
}
