<template>
  <nav class="flex mb-5 h-13 bg-gray-100 rounded-lg" aria-label="Breadcrumb">
    <ul class="p-4 flex flex-wrap space-x-3 text-sm font-medium">
      <li class="flex items-center space-x-3">
        <a
          @click="dashboard()"
          class="cursor-pointer flex items-center space-x-1 text-gray-800"
        >
          <svg
            class="h-4 w-4 shrink-0 fill-gray-500"
            aria-hidden="true"
            viewBox="0 0 256 256"
          >
            <path
              d="M184 32H72A16 16 0 0056 48V224a8.1 8.1.0 004.1 7 7.6 7.6.0 003.9 1 7.9 7.9.0 004.2-1.2L128 193.4l59.7 37.4a8.3 8.3.0 008.2.2 8.1 8.1.0 004.1-7V48A16 16 0 00184 32z"
            ></path>
          </svg>
          <span>Dashboard</span>
        </a>
      </li>
      <li class="flex items-center space-x-3" aria-current="page">
        <div
          aria-hidden="true"
          class="h-4 w-px rotate-12 rounded-full bg-gray-300"
        ></div>

        <span class="flex items-center space-x-1">
          <svg
            class="h-4 w-4 shrink-0 fill-gray-400"
            aria-hidden="true"
            viewBox="0 0 256 256"
          >
            <path
              d="M136 88H120V35.3L91.7 63.6A8 8 0 0180.3 52.3l42-42a8.1 8.1.0 0111.4.0l42 42a8 8 0 010 11.3 8 8 0 01-11.4.0L136 35.3zm64 0H136v40a8 8 0 01-16 0V88H56a16 16 0 00-16 16V208a16 16 0 0016 16H2e2a16 16 0 0016-16V104A16 16 0 002e2 88z"
            ></path>
          </svg>
          <span class="text-gray-400">Permission</span>
        </span>
      </li>
    </ul>
  </nav>
  <div class="h-screen p-4">
    <div
      v-if="hasPermission('Permission', 'can_view') || role == 'Admin'"
      class="w-full mb-4 flex gap-2"
    >
      <div ref="dropdownRef" class="relative w-full">
        <div
          class="w-full p-2 bg-gray-700 text-white rounded ml-3 cursor-pointer flex justify-between items-center"
          @click="toggleDropdown"
        >
          <span>{{ selectedUserName || "Select User" }}</span>
          <svg
            v-if="selectedUserName"
            @click="clearSelectedUsername"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-7 text-red-600 hover:text-red-800 hover:size-8 mr-2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>
        <div
          v-show="isDropdownOpen"
          class="absolute w-full bg-gray-700 border border-gray-600 rounded mt-1 z-10 ml-3"
        >
          <div class="p-2">
            <input
              type="text"
              v-model="query.Search"
              @input="getEmployeeList"
              placeholder="Search user..."
              class="w-full p-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none"
            />
          </div>
          <div
            v-for="user in users"
            :key="user.id"
            @click="selectUser(user)"
            class="p-2 hover:bg-gray-600 cursor-pointer text-white"
          >
            {{ user.employeeFullName ?? "No Fullname" }} - {{ user.email }}
          </div>
          <div v-if="users.length === 0" class="p-2 text-gray-400 text-center">
            No users found.
          </div>
          <div
            v-if="users.length < totalCount"
            class="border-t border-gray-600"
          >
            <button
              @click="loadMoreEmployeeList"
              class="w-full p-2 bg-gray-700 hover:bg-gray-800 text-white"
            >
              Load More
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Dropdown Menu on Top -->
    <div
      v-if="
        selectedUserId &&
        (hasPermission('Permission', 'can_add') || role == 'Admin')
      "
      class="w-full mb-4 flex gap-2"
    >
      <select
        v-model="currentSelection"
        class="w-full p-2 bg-gray-700 text-white rounded ml-3"
      >
        <option value="" selected hidden>Select Menu</option>
        <option
          v-if="availableMenus.length"
          v-for="menu in availableMenus"
          :key="menu.id"
          :value="menu"
        >
          {{ menu.name }}
        </option>
        <option v-else class="text-white !important" disabled>
          No Menus Found
        </option>
      </select>
      <button
        @click="addSelectedMenu"
        class="px-10 bg-blue-500 hover:bg-blue-800 text-white rounded"
        :disabled="!currentSelection"
      >
        Add
      </button>
    </div>

    <!-- Table Content -->
    <div
      v-if="hasPermission('Permission', 'can_view') || role == 'Admin'"
      class="w-full p-4"
    >
      <h2 class="text-xl font-semibold mb-4">Selected Menus & Permissions</h2>
      <table class="w-full border border-gray-300">
        <thead>
          <tr class="bg-gray-200">
            <th class="border p-2">Menu Name</th>
            <th class="border p-2">View</th>
            <th class="border p-2">Create</th>
            <th class="border p-2">Update</th>
            <th class="border p-2">Delete</th>
          </tr>
        </thead>
        <tbody v-if="selectedMenus.length">
          <tr v-for="menu in selectedMenus" :key="menu.id">
            <td class="border p-2">{{ menu.name }}</td>
            <td class="border p-2 text-center">
              <input
                type="checkbox"
                class="w-5 h-5"
                :checked="menu.permissions.includes(4)"
                @change="togglePermission(menu, 4)"
              />
            </td>
            <td class="border p-2 text-center">
              <input
                type="checkbox"
                class="w-5 h-5"
                :checked="menu.permissions.includes(1)"
                @change="togglePermission(menu, 1)"
              />
            </td>
            <td class="border p-2 text-center">
              <input
                type="checkbox"
                class="w-5 h-5"
                :checked="menu.permissions.includes(2)"
                @change="togglePermission(menu, 2)"
              />
            </td>
            <td class="border p-2 text-center">
              <input
                type="checkbox"
                class="w-5 h-5"
                :checked="menu.permissions.includes(3)"
                @change="togglePermission(menu, 3)"
              />
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="5" class="p-5 text-center text-gray-500">
              No Records.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      v-if="hasPermission('Permission', 'can_edit') || role == 'Admin'"
      class="flex justify-end mt-4 mr-4"
    >
      <button
        @click="savePermissions"
        class="px-6 py-2 bg-green-500 hover:bg-green-800 text-white rounded"
      >
        Save Permissions
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { API_BASE_URL } from "~/config";
import {
  getEmployeeList,
  users,
  loadMoreEmployeeList,
  totalCount,
  query,
} from "~/js/fetchMenu";
import { getToken } from "~/js/fetchToken";
import { useAuth } from "~/composables/useAuth";
import { usePermissions } from "#imports";
const { hasPermission } = usePermissions();
const { $swal } = useNuxtApp();
const { role, fetchRole } = useAuth();
const menus = ref([]);
const router = useRouter();
const selectedMenus = ref([]);
const currentSelection = ref("");
const selectedUserId = ref(""); // Holds the selected user ID
const selectedUserName = ref("");
const isDropdownOpen = ref(false);
const dropdownRef = ref(null);

function dashboard() {
  router.push("/main/dashboard");
}
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const selectUser = (user) => {
  selectedUserId.value = user.userId;
  selectedUserName.value = user.employeeFullName ?? user.email;
  isDropdownOpen.value = false;
  fetchUserPermissions();
};
const clearSelectedUsername = () => {
  selectedUserName.value = "";
  selectedUserId.value = "";
  fetchUserPermissions();
};
const fetchMenus = async () => {
  const token = getToken();
  if (!token) {
    throw new Error("No token found");
  }
  const response = await $fetch(`${API_BASE_URL}/api/menu`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }); // Replace with your actual API endpoint
  menus.value = response.map((menu) => ({
    ...menu,
    permissions: [], // Add an empty permissions array
  }));
};

const availableMenus = computed(() => {
  return menus.value.filter(
    (menu) => !selectedMenus.value.some((selected) => selected.id === menu.id)
  );
});

const addSelectedMenu = () => {
  if (!currentSelection.value) return;

  selectedMenus.value.push({
    id: currentSelection.value.id,
    name: currentSelection.value.name,
    permissions: [...currentSelection.value.permissions],
  });

  currentSelection.value =
    availableMenus.value.length > 0 ? availableMenus.value[0] : null;
};

const togglePermission = (menu, permissionId) => {
  const index = menu.permissions.indexOf(permissionId);
  if (index === -1) {
    menu.permissions.push(permissionId);
  } else {
    menu.permissions.splice(index, 1);
  }
};

const savePermissions = async () => {
  const promises = selectedMenus.value.map(async (menu) => {
    const permissionData = {
      UserId: selectedUserId.value,
      MenuId: menu.id,
      PermissionIds: menu.permissions,
    };

    try {
      await $fetch(`${API_BASE_URL}/permissions/sync`, {
        method: "POST",
        body: permissionData,
      });
    } catch (error) {
      console.error(`Error saving permissions for ${menu.name}:`, error);
    }
  });

  await Promise.all(promises);

  await $swal.fire({
    title: "Success",
    icon: "success",
    confirmButtonText: "OK",
  });

  fetchUserPermissions();
};

const fetchUserPermissions = async () => {
  try {
    if (!selectedUserId.value) {
      selectedMenus.value = []; // Clear the selected menus if no user is selected
      return;
    }
    console.log(selectedUserId.value);
    const response = await $fetch(
      `${API_BASE_URL}/GetUserMenuPermissions/${selectedUserId.value}`
    );
    console.log("Fetched Permissions:", response);

    selectedMenus.value = response.map((menu) => ({
      id: menu.menuId,
      name: menus.value.find((m) => m.id === menu.menuId)?.name || "Unknown",
      permissions: menu.permissions || [],
    }));
  } catch (error) {
    console.error("Error fetching user permissions:", error);
    alert("Failed to fetch permissions. Check API logs.");
  }
};
const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isDropdownOpen.value = false;
  }
};

// Attach and remove event listener
onMounted(() => {
  window.addEventListener("click", handleClickOutside);
});
onBeforeUnmount(() => {
  window.removeEventListener("click", handleClickOutside);
});

onMounted(async () => {
  await getEmployeeList();
  await fetchMenus();
  await fetchRole(); // Ensure role is loaded when the component is mounted
});
definePageMeta({
  middleware: "auth",
  menu: "Permission",
});
</script>
