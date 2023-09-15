import axios from "axios";
import LocalStorage from "../utils/LocalStorage";
import { GLobalError, UnauthorizedError } from "../utils/AppError";

const client = axios.create({
    baseURL: "10.10.100.254:8080",
});

client.interceptors.request.use(async (config) => {
    if (config.url !== "/users/login") {
        const token = await LocalStorage().getData("token");
        config.headers = {
            Authorization: `Bearer ${token}`,
        };
    }
    return config;
});

const apiClient = async ({ url, method, param = null }) => {
    try {
        const result = await client[method](url, param);
        return result;
    } catch (error) {
        if (error.response.status === 401) {
            throw new UnauthorizedError("Unauthorized");
        } else {
            throw new GLobalError(`Error GLobal ${error.response.data.msg}`);
        }
    }
};

export default apiClient;
