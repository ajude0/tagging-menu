import { getToken, getIsApproved ,getRole} from "~/js/fetchToken";
import { usePermissions } from "#imports";
import { fetchUser, employee } from '~/js/fetchUsers';

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (process.client) {
    const token = getToken();
    const isApproved = getIsApproved();
    const role = getRole();
    

    if(token && role == "Admin"){
      return;
    }
    if (!token || !isApproved || isApproved != 1) {
      console.warn("Unauthorized: Redirecting to login.");
      return navigateTo("/");
    }

    const { fetchPermissions, hasMenuAccess } = usePermissions();
    const menuName = to.meta.menu || ""; // Ensure it has a default value
    await fetchUser();
    await fetchPermissions(employee.value.userId);
    console.log("Permissions loaded:", hasMenuAccess(menuName));

    // Check if the user has access to the menu
    if (menuName && !hasMenuAccess(menuName)) {
      console.warn("Unauthorized access to:", menuName);
      return navigateTo("/unauthorized");
    }
  }
});
