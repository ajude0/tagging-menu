import { API_BASE_URL } from "~/config";
import { getToken } from "./fetchToken";
export const profileImage = ref("");
export const users = ref([]);
export const query = ref({
  Search: "",
  Status: "",
  IsApproved: "",
  SortBy: "",
  isDescending: "false",
  PageNumber: 1, // Default to first page
  PageSize: 5,
});
export const totalEntries = ref(0);
export const totalPages = ref(0);

export const getUsers = async () => {
  try {
    const token = getToken();
    if (!token) throw new Error("No token found");
    const response = await $fetch(`${API_BASE_URL}/api/Employee`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { ...query.value },
    });
    users.value = response.users;
    totalEntries.value = response.totalCount;
    totalPages.value = Math.ceil(response.totalCount / query.value.PageSize);
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};
export const getEmployees = async () => {
  try {
    const token = getToken();
    if (!token) throw new Error("No token found");
    const response = await $fetch(`${API_BASE_URL}/employees`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { ...query.value },
    });
    users.value = response.users;
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};
export const changePage = (page) => {
  if (page < 1 || page > totalPages.value) return;
  query.value.PageNumber = page;
  getUsers();
};

export const generatePagination = () => {
  if (totalPages.value <= 1) return [];
  let pages = [];
  const current = query.value.PageNumber;
  const maxVisible = 5;

  if (totalPages.value <= maxVisible) {
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);
    if (current > 3) pages.push("...");

    let start = Math.max(2, current - 1);
    let end = Math.min(totalPages.value - 1, current + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (current < totalPages.value - 2) pages.push("...");
    pages.push(totalPages.value);
  }
  return pages;
};

export const toggleSort = (field) => {
  if (query.value.SortBy === field) {
    query.value.isDescending = !query.value.isDescending; // Toggle order
  } else {
    query.value.SortBy = field;
    query.value.isDescending = false; // Default to ascending order
  }
  getUsers();
};
