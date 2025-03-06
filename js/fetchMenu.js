import { getToken } from "./fetchToken";
import { API_BASE_URL } from "~/config";
const { $swal } = useNuxtApp();
export const menus = ref([]);
export const updateMenu = ref({}); // Ensure it's an object
export const users = ref([]);
export const totalCount = ref();
export const query = ref({
  Search: "",
  Status: "",
  IsApproved: "",
  SortBy: "",
  isDescending: "false",
  PageNumber: 1, // Default to first page
  PageSize: 5,
});
export const loadMoreEmployeeList = async () => {
  query.value.PageSize += 5;
  await getEmployeeList();
};

export const getMenus = async () => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error("No token found");
    }
    const response = await $fetch(`${API_BASE_URL}/api/menu`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    menus.value = response;
  } catch (error) {
    console.error("Error fetching menus:", error);
  }
};

export const createMenu = async (menuName,$swal) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error("No token found");
    }

    const response = await $fetch(`${API_BASE_URL}/api/menu`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Specify JSON content type
      },
      body: JSON.stringify({
        name: menuName, // Send the menu name correctly
      }),
    });
    await $swal.fire({
      title: "Created!",
      text: "The menu has been successfully created.",
      icon: "success",
      confirmButtonText: "OK",
    });
    getMenus();
  } catch (error) {
    console.error("Error creating menu:", error);
  }
};
export const getMenu = async (menuId) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error("No token found");
    }
    const response = await $fetch(`${API_BASE_URL}/api/menu/${menuId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    updateMenu.value = response;
  } catch (error) {
    console.error("Error fetching menus:", error);
  }
};

export const editMenu = async (menuId, menuName, $swal) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error("No token found");
    }
    const response = await $fetch(`${API_BASE_URL}/api/menu/${menuId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Specify JSON content type
      },
      body: JSON.stringify({
        menuName: menuName, // Send the menu name correctly
      }),
    });
    await $swal.fire({
      title: "Updated!",
      text: "The menu has been successfully updated.",
      icon: "success",
      confirmButtonText: "OK",
    });
    getMenus();
  } catch (error) {
    console.error("Error creating menu:", error);
  }
};

export const getEmployeeList = async () => {
  try {
    const token = getToken();
    if (!token) throw new Error("No token found");
    const response = await $fetch(`${API_BASE_URL}/get-employees`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { ...query.value },
    });
    users.value = response.users;
    totalCount.value = response.totalCount;
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};

export const deleteMenu = async (menuId,$swal) => {
  const result = await $swal.fire({
    title: "Are you sure?",
    text: "This action cannot be undone!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
  });

  if (result.isConfirmed) {
    try {
      const token = getToken();
      if (!token) {
        throw new Error("No token found");
      }
      const response = await $fetch(
        `${API_BASE_URL}/api/menu/delete/${menuId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Specify JSON content type
          },
        }
      );

      getMenus();
      await $swal.fire({
        title: "Deleted!",
        text: "The menu has been successfully deleted.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Error deleting menu:", error);
    }
  }
};
