import { useState } from "#app";
import { getRole } from "~/js/fetchToken"; // Ensure you have a way to get the user ID

export const useAuth = () => {
  const role = useState("role", () => ""); // Global state for role

  const fetchRole = async () => {
    try {
      role.value = getRole();
    } catch (error) {
      console.error("Error fetching user role:", error);
    }
  };

  return { role, fetchRole };
};
