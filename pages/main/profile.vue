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
          <span class="text-gray-400">Profile</span>
        </span>
      </li>
    </ul>
  </nav>
  <div class="flex items-start justify-between p-5 border-b rounded-top">
    <h3 class="text-xl font-semibold">Profile</h3>
  </div>

  <div class="p-6 space-y-5">
    <form @submit.prevent="createUserProfile">
      <div class="grid grid-cols-12 gap-3">
        <!-- Profile Photo Section -->
        <div class="col-span-12 h-52 relative">
          <div
            class="items-center absolute top-0 left-0 w-full h-2/3 bg-cyan-500 rounded-t-lg"
          >
            <div class="relative mt-12">
              <img
                :src="previewImage"
                alt="Profile Picture"
                class="rounded-full w-40 h-40 mx-auto border-4 border-black transition-transform duration-300 hover:scale-105 ring ring-gray-300"
              />
            </div>
          </div>
        </div>
        <div class="col-span-12 mx-auto mb-2">
          <input
            :disabled="!isEditing"
            type="file"
            name=""
            id="upload_profile"
            hidden
            @change="loadFile"
            class="mx-auto"
          />

          <label
            v-if="isEditing"
            for="upload_profile"
            class="inline-flex items-center bg-gray-800 hover:bg-gray-900 p-3 rounded-full cursor-pointer"
          >
            <svg
              data-slot="icon"
              class="w-6 h-6 text-white mr-1"
              fill="none"
              stroke-width="1.5"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
              ></path>
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
              ></path>
            </svg>
            <div class="text-white">Change Profile Picture</div>
          </label>
        </div>
        <!-- Full Name Input -->
        <div v-if="!isEditing" class="col-span-12">
          <label
            for="full-name"
            class="text-sm font-medium text-gray-900 block mb-2"
            >Full Name</label
          >
          <input
            disabled
            id="full-name"
            type="text"
            v-model="formData.fullName"
            class="shadow-sm disabled:bg-gray-200 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
            placeholder="Your Full Name"
            required
          />
        </div>
        <div v-if="isEditing" class="col-span-12">
          <label
            for="firstname"
            class="text-sm font-medium text-gray-900 block mb-2"
            >Firstname</label
          >
          <input
            id="full-name"
            type="text"
            v-model="formData.firstname"
            class="shadow-sm disabled:bg-gray-200 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
            placeholder="Your Firstname"
            required
          />
        </div>
        <div v-if="isEditing" class="col-span-12">
          <label
            for="middlename"
            class="text-sm font-medium text-gray-900 block mb-2"
            >Middlename</label
          >
          <input
            id="middlename"
            type="text"
            v-model="formData.middlename"
            class="shadow-sm disabled:bg-gray-200 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
            placeholder="Your Middlename"
          />
        </div>
        <div v-if="isEditing" class="col-span-12">
          <label
            for="lastname"
            class="text-sm font-medium text-gray-900 block mb-2"
            >Lastname</label
          >
          <input
            id="lastname"
            type="text"
            v-model="formData.lastname"
            class="shadow-sm disabled:bg-gray-200 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
            placeholder="Your Lastname"
            required
          />
        </div>

        <div class="lg:col-span-6 col-span-12">
          <label
            for="category"
            class="text-sm font-medium text-gray-900 block mb-2"
            >Username</label
          >
          <input
            type="text"
            v-model="formData.username"
            class="shadow-sm disabled:bg-gray-200 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
            placeholder="Username"
            disabled
          />
        </div>

        <div class="lg:col-span-6 col-span-12">
          <label
            for="price"
            class="text-sm font-medium text-gray-900 block mb-2"
            >Email</label
          >
          <input
            type="text"
            v-model="formData.email"
            class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 disabled:bg-gray-200"
            placeholder="example@example.com"
            disabled
          />
        </div>
      </div>

      <!-- Submit Button -->
      <div class="flex justify-between">
        <button
          class="mt-5 text-white bg-cyan-600 hover:bg-cyan-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          type="submit"
        >
          {{ isEditing ? "Save Changes" : "Edit" }}
        </button>
        <button
          v-if="isEditing"
          @click="cancelEdit"
          class="mt-5 text-white bg-red-500 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { API_BASE_URL } from "~/config";
import { getToken } from "~/js/fetchToken";
import { useRouter } from "vue-router";

const { $swal } = useNuxtApp();
const router = useRouter();
const isEditing = ref(false);
const profileImage = ref(null);
const previewImage = ref(defaultImage);
const defaultImage = "http://localhost:3000/_nuxt/static/images/UserIcon.png";
const formData = ref({
  fullName: "",
  address: "",
  birthdate: "",
  profileImagePath: "",
  firstname: "",
  middlename: "",
  lastname: "",
});

const originalData = ref({});

const fetchUsers = async () => {
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
    if (data) {
      formData.value = {
        fullName: data.employeeFullName || "",
        firstname: data.firstname || "",
        middlename: data.middlename || "",
        lastname: data.lastname || "",
        username: data.username || "",
        email: data.email || "",
        profileImagePath: data.profileImagePath || "",
      };
      originalData.value = { ...formData.value }; // Backup the data
      previewImage.value = formData.value.profileImagePath
        ? `${API_BASE_URL}/${formData.value.profileImagePath}`
        : defaultImage;
    }
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

const loadFile = (event) => {
  const file = event.target.files[0];
  if (file && file.type.startsWith("image/")) {
    profileImage.value = file;
    previewImage.value = URL.createObjectURL(file);
  } else {
    alert("Please select a valid image file.");
  }
};

const createUserProfile = async () => {
  if (isEditing.value) {
    const token = getToken();
    if (!token) {
      throw new Error("No token found");
    }

    try {
      const formDataObj = new FormData();
      formDataObj.append("firstname", formData.value.firstname);
      formDataObj.append("lastname", formData.value.lastname);
      formDataObj.append("middlename", formData.value.middlename);

      if (profileImage.value) {
        formDataObj.append("profileImagePath", profileImage.value);
        console.log("Uploaded file:", profileImage.value); // Debug log
      }

      await $fetch(`${API_BASE_URL}/api/profile`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataObj,
      });

      isEditing.value = false;
      fetchUsers();
      await $swal.fire({
        title: "Update Sucessfully",

        icon: "success",
        confirmButtonText: "OK",
      });
      s;
      originalData.value = { ...formData.value };
    } catch (error) {}
  } else {
    isEditing.value = !isEditing.value;
  }
};

const cancelEdit = () => {
  isEditing.value = false;
  formData.value = { ...originalData.value }; // Restore the original data
  previewImage.value = formData.value.profileImagePath
    ? `${API_BASE_URL}/${formData.value.profileImagePath}`
    : defaultImage;
};
function dashboard() {
  router.push("/main/dashboard");
}
definePageMeta({
  middleware: ["auth"],
});

onMounted(async () => {
  await fetchUsers();
  await fetchRole(); // Ensure role is loaded when the component is mounted
});

definePageMeta({
  middleware: "auth",
  menu: "Profile",
});
</script>

<style></style>
