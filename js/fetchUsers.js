import { getToken } from "./fetchToken";
import { API_BASE_URL } from "~/config";
export const employee = ref()
export const fetchUser = async () => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error("No token found");
      }
      const data = await $fetch(`${API_BASE_URL}/api/employee/get-my-info`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      employee.value = data;
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };