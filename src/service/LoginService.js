import { useDeps } from "../context/DependencyContext";
import LocalStorage from "../utils/LocalStorage";

const LoginService = () => {
    const { apiClient } = useDeps();

    const login = async (email, password) => {
        try {
            const result = await apiClient({
                method: "post",
                url: "/api/auth/login",
                param: {
                    email: email,
                    password: password,
                },
            });
            console.log("Token", result.data.data.token);
            await LocalStorage().setData("token", result.data.data.token);
        } catch (error) {
            throw error;
        }
    };
    return {
        login,
    };
};

export default LoginService;
