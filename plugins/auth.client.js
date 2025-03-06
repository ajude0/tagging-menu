import { useAuth } from "#imports";

export default defineNuxtPlugin(async () => {
    const { fetchRole } = useAuth();
    await fetchRole(); // Fetch role when app starts
  });