import { useState } from "#app";
import { API_BASE_URL } from "~/config";

export const usePermissions = () => {
  const permissions = useState("permissions", () => []);

  const fetchPermissions = async (userId) => {
    try {
      const response = await $fetch(`${API_BASE_URL}/get-user-permission/${userId}`);
      permissions.value = response;
      console.log(permissions.value);
    } catch (error) {
      console.error("Error fetching permissions:", error);
    }
  };

  const hasMenuAccess = (menuName) => {
    return permissions.value.some(menu => menu.menuName === menuName);
  };

  const hasPermission = (menuName, permission) => {
    const menu = permissions.value.find(menu => menu.menuName === menuName);
    return menu ? menu.permissions.includes(permission) : false;
  };

  return {
    permissions,
    fetchPermissions,
    hasMenuAccess,
    hasPermission
  };
};
