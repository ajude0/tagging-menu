import { API_BASE_URL } from "~/config";
export const approve = ref()
export const getCookies = async () => {
    try {
       approve.value= await $fetch(`${API_BASE_URL}/api/account/check-token`, {
        method: "POST",
      });
     console.log('here');
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };