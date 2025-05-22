import { ref, type Ref } from "vue";
import axios, { AxiosError } from "axios";
import apiInstance from "@/lib/axios.instance";

interface UserCredentials {
  email: string;
  password: string;
}

interface AuthenticationResponse {
  access_token: string;
}

interface AuthenticationErrorResponse {
  message: string[];
}

interface UseAuthComposable {
  isLoading: Ref<boolean>;
  error: Ref<string[] | null>;
  handleLogin: (userCredentials: UserCredentials) => Promise<void>;
  handleRegistration: (userCredentials: UserCredentials) => Promise<void>;
}

export const useAuth = (): UseAuthComposable => {
  const isLoading = ref<boolean>(false);
  const error = ref<string[] | null>(null);

  const handleLogin = async (
    userCredentials: UserCredentials
  ): Promise<void> => {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await apiInstance.post<AuthenticationResponse>(
        "/auth/login",
        userCredentials
      );

      console.log("RESPONSE", response.data);
      const token = response.data.access_token;

      localStorage.setItem("access-token", token);
    } catch (err) {
      const errorResponse = err as AxiosError<AuthenticationErrorResponse>;
      console.log("ERROR", errorResponse?.response?.data);
      error.value = errorResponse?.response?.data?.message || [
        "Login Attempt Failed",
      ];
    } finally {
      isLoading.value = false;
    }
  };

  const handleRegistration = async (
    userCredentials: UserCredentials
  ): Promise<void> => {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await axios.post<AuthenticationResponse>(
        `${API_URL}/register`,
        userCredentials
      );
      const token = response.data.access_token;

      localStorage.setItem("access-token", token);
    } catch (err) {
      const errorResponse = err as AxiosError<AuthenticationErrorResponse>;
      error.value = errorResponse?.response?.data?.message || [
        "Registration Attempt Failed",
      ];
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    error,
    handleLogin,
    handleRegistration,
  };
};
