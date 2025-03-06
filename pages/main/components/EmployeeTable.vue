<template>
  <div class="flex flex-col md:flex-row justify-between">
    <div class="relative text-gray-500 focus-within:text-gray-900 mb-4">
      <!-- Left Icon -->
      <div
        class="absolute inset-y-0 left-3 flex items-center pointer-events-none"
      >
        <svg
          class="w-5 h-5"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.5 17.5L15.4167 15.4167M15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333C11.0005 15.8333 12.6614 15.0929 13.8667 13.8947C15.0814 12.6872 15.8333 11.0147 15.8333 9.16667Z"
            stroke="#9CA3AF"
            stroke-width="1.6"
            stroke-linecap="round"
          />
        </svg>
      </div>

      <!-- Right Icon -->
      <div
        v-if="query.Search"
        class="absolute inset-y-0 left-72 flex items-center"
      >
        <svg
          @click="clearSearch"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6 cursor-pointer text-red-700"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </div>

      <!-- Input Field -->
      <input
        type="text"
        id="default-search"
        v-model="query.Search"
        @input="getUsers"
        class="block w-80 h-11 pr-10 pl-10 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-transparent border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none"
        placeholder="Search"
      />
    </div>
    <div class="mb-2">
      <div class="relative inline-block mr-4">
        <select
          id="dropdown"
          class="px-5 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none pr-10"
          v-model="query.Status"
          @change="getUsers"
          @focus="isOpen = true"
          @blur="isOpen = false"
          @click="open"
        >
          <option value="" selected hidden>Select Status</option>
          <option value="0">Inactive</option>
          <option value="1">Active</option>
        </select>
        <div
          v-if="query.Status"
          class="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
        >
          <svg
            @click="clearStatus"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6 cursor-pointer text-red-700"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>
        <div
          v-if="!query.Status"
          class="absolute inset-y-0 right-2 flex items-center text-gray-500"
        >
          <svg
            :class="{ 'rotate-180': isOpen }"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6 transition-transform duration-200"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 9l-7.5 7.5L4.5 9"
            />
          </svg>
        </div>
      </div>
      <div class="relative inline-block">
        <select
          id="dropdown"
          class="px-5 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none pr-10"
          v-model="query.IsApproved"
          @change="getUsers"
          @focus="isApprovedOpen = true"
          @blur="isApprovedOpen = false"
        >
          <option value="" selected hidden>Select Approved</option>
          <option value="0">Pending</option>
          <option value="1">Approved</option>
          <option value="2">Rejected</option>
        </select>
        <div
          v-if="query.IsApproved"
          class="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
        >
          <svg
            @click="clearApproved"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6 cursor-pointer text-red-700"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </div>
        <div
          v-if="!query.IsApproved"
          class="absolute inset-y-0 right-2 flex items-center text-gray-500"
        >
          <svg
            :class="{ 'rotate-180': isApprovedOpen }"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6 transition-transform duration-200"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 9l-7.5 7.5L4.5 9"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
  <div class="flex flex-col">
    <div class="overflow-x-auto pb-4">
      <div class="min-w-full inline-block align-middle">
        <div class="overflow-hidden border rounded-lg border-gray-300">
          <table class="table-auto min-w-full rounded-xl">
            <thead>
              <tr class="bg-gray-50 gap-3">
                <th
                  @click="toggleSort('EmployeeFullName')"
                  scope="col"
                  class="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize cursor-pointer"
                >
                  Full Name &amp; Email
                  <button class="ml-2 focus:outline-none">
                    {{
                      query.SortBy === "EmployeeFullName"
                        ? query.isDescending
                          ? "↓"
                          : "↑"
                        : "↓↑"
                    }}
                  </button>
                </th>
                <th
                  scope="col"
                  class="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"
                >
                  Role
                </th>
                <th
                  scope="col"
                  class="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"
                >
                  Status
                </th>
                <th
                  scope="col"
                  class="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"
                >
                  Is Approved
                </th>

                <th
                  scope="col"
                  class="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"
                >
                  Actions
                </th>
                <th
                  scope="col"
                  class="p-5 text-left whitespace-nowrap text-sm leading-6 font-semibold text-gray-900 capitalize"
                ></th>
              </tr>
            </thead>
            <tbody v-if="users.length" class="divide-y divide-gray-300">
              <tr
                v-for="user in users"
                :key="user.userId"
                class="bg-white transition-all duration-500 hover:bg-gray-50"
              >
                <td class="pr-4 px-5 py-3 whitespace-nowrap">
                  <div class="flex items-center gap-3">
                    <img
                      :src="
                        user?.profileImagePath
                          ? `${API_BASE_URL}/${user.profileImagePath}`
                          : defaultImage
                      "
                      class="relative inline-block h-9 w-9 !rounded-full object-cover object-center"
                      alt="Richard image"
                    />
                    <div class="data min-w-[150px]">
                      <p
                        class="font-normal text-sm text-gray-900 whitespace-nowrap"
                      >
                        {{ user.employeeFullName ?? "Unknown" }}
                      </p>
                      <p
                        class="font-normal text-xs leading-5 text-gray-400 whitespace-nowrap"
                      >
                        {{ user.email }}
                      </p>
                    </div>
                  </div>
                </td>
                <td
                  class="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900"
                >
                  {{ user.role }}
                </td>

                <td
                  class="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900"
                >
                  <div
                    v-if="user.status == 0"
                    class="py-1.5 px-2.5 bg-red-50 rounded-full flex items-center justify-center w-20 gap-1"
                  >
                    <svg
                      width="5"
                      height="6"
                      viewBox="0 0 5 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="2.5" cy="3" r="2.5" fill="#DC2626"></circle>
                    </svg>
                    <span class="font-medium text-xs text-red-600"
                      >INACTIVE</span
                    >
                  </div>
                  <div
                    v-else
                    class="py-1.5 px-2.5 bg-green-50 rounded-full flex items-center justify-center w-20 gap-1"
                  >
                    <svg
                      width="5"
                      height="6"
                      viewBox="0 0 5 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="2.5" cy="3" r="2.5" fill="#16A34A"></circle>
                    </svg>
                    <span class="font-medium text-xs text-green-600"
                      >ACTIVE</span
                    >
                  </div>
                </td>
                <td
                  class="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900"
                >
                  <div
                    v-if="user.isApproved == 2"
                    class="py-1.5 px-2.5 bg-red-50 rounded-full flex items-center justify-center w-20 gap-1"
                  >
                    <svg
                      width="5"
                      height="6"
                      viewBox="0 0 5 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="2.5" cy="3" r="2.5" fill="#DC2626"></circle>
                    </svg>
                    <span class="font-medium text-xs text-red-600"
                      >Rejected</span
                    >
                  </div>
                  <div
                    v-if="user.isApproved == 1"
                    class="py-1.5 px-2.5 bg-green-50 rounded-full flex items-center justify-center w-20 gap-1"
                  >
                    <svg
                      width="5"
                      height="6"
                      viewBox="0 0 5 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="2.5" cy="3" r="2.5" fill="#16A34A"></circle>
                    </svg>
                    <span class="font-medium text-xs text-green-600"
                      >Approved</span
                    >
                  </div>
                  <div
                    v-if="user.isApproved == 0"
                    class="py-1.5 px-2.5 bg-amber-50 rounded-full flex items-center justify-center w-20 gap-1"
                  >
                    <svg
                      width="5"
                      height="6"
                      viewBox="0 0 5 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="2.5" cy="3" r="2.5" fill="#D97706"></circle>
                    </svg>
                    <span class="font-medium text-xs text-amber-600"
                      >Pending</span
                    >
                  </div>
                </td>
                <td class="flex p-5 items-center gap-0.5">
                  <button
                    v-if="hasPermission('Users', 'can_view') || role == 'Admin'"
                    class="p-2 rounded-full bg-white group transition-all duration-500 hover:bg-green-600 flex item-center"
                    @click="viewEmployee(user.userId)"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      width="20"
                      height="20"
                    >
                      <path
                       class="fill-green-600 group-hover:fill-white"
                      d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                      <path
                         class="fill-green-600 group-hover:fill-white"
                        fill-rule="evenodd"
                        d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                  <button
                    v-if="
                      hasPermission('Users', 'can_delete') || role == 'Admin'
                    "
                    class="p-2 rounded-full bg-white group transition-all duration-500 hover:bg-red-600 flex item-center"
                  >
                    <svg
                      class=""
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        class="fill-red-600 group-hover:fill-white"
                        d="M4.00031 5.49999V4.69999H3.20031V5.49999H4.00031ZM16.0003 5.49999H16.8003V4.69999H16.0003V5.49999ZM17.5003 5.49999L17.5003 6.29999C17.9421 6.29999 18.3003 5.94183 18.3003 5.5C18.3003 5.05817 17.9421 4.7 17.5003 4.69999L17.5003 5.49999ZM9.30029 9.24997C9.30029 8.80814 8.94212 8.44997 8.50029 8.44997C8.05847 8.44997 7.70029 8.80814 7.70029 9.24997H9.30029ZM7.70029 13.75C7.70029 14.1918 8.05847 14.55 8.50029 14.55C8.94212 14.55 9.30029 14.1918 9.30029 13.75H7.70029ZM12.3004 9.24997C12.3004 8.80814 11.9422 8.44997 11.5004 8.44997C11.0585 8.44997 10.7004 8.80814 10.7004 9.24997H12.3004ZM10.7004 13.75C10.7004 14.1918 11.0585 14.55 11.5004 14.55C11.9422 14.55 12.3004 14.1918 12.3004 13.75H10.7004ZM4.00031 6.29999H16.0003V4.69999H4.00031V6.29999ZM15.2003 5.49999V12.5H16.8003V5.49999H15.2003ZM11.0003 16.7H9.00031V18.3H11.0003V16.7ZM4.80031 12.5V5.49999H3.20031V12.5H4.80031ZM9.00031 16.7C7.79918 16.7 6.97882 16.6983 6.36373 16.6156C5.77165 16.536 5.49093 16.3948 5.29823 16.2021L4.16686 17.3334C4.70639 17.873 5.38104 18.0979 6.15053 18.2013C6.89702 18.3017 7.84442 18.3 9.00031 18.3V16.7ZM3.20031 12.5C3.20031 13.6559 3.19861 14.6033 3.29897 15.3498C3.40243 16.1193 3.62733 16.7939 4.16686 17.3334L5.29823 16.2021C5.10553 16.0094 4.96431 15.7286 4.88471 15.1366C4.80201 14.5215 4.80031 13.7011 4.80031 12.5H3.20031ZM15.2003 12.5C15.2003 13.7011 15.1986 14.5215 15.1159 15.1366C15.0363 15.7286 14.8951 16.0094 14.7024 16.2021L15.8338 17.3334C16.3733 16.7939 16.5982 16.1193 16.7016 15.3498C16.802 14.6033 16.8003 13.6559 16.8003 12.5H15.2003ZM11.0003 18.3C12.1562 18.3 13.1036 18.3017 13.8501 18.2013C14.6196 18.0979 15.2942 17.873 15.8338 17.3334L14.7024 16.2021C14.5097 16.3948 14.229 16.536 13.6369 16.6156C13.0218 16.6983 12.2014 16.7 11.0003 16.7V18.3ZM2.50031 4.69999C2.22572 4.7 2.04405 4.7 1.94475 4.7C1.89511 4.7 1.86604 4.7 1.85624 4.7C1.85471 4.7 1.85206 4.7 1.851 4.7C1.05253 5.50059 1.85233 6.3 1.85256 6.3C1.85273 6.3 1.85297 6.3 1.85327 6.3C1.85385 6.3 1.85472 6.3 1.85587 6.3C1.86047 6.3 1.86972 6.3 1.88345 6.3C1.99328 6.3 2.39045 6.3 2.9906 6.3C4.19091 6.3 6.2032 6.3 8.35279 6.3C10.5024 6.3 12.7893 6.3 14.5387 6.3C15.4135 6.3 16.1539 6.3 16.6756 6.3C16.9364 6.3 17.1426 6.29999 17.2836 6.29999C17.3541 6.29999 17.4083 6.29999 17.4448 6.29999C17.4631 6.29999 17.477 6.29999 17.4863 6.29999C17.4909 6.29999 17.4944 6.29999 17.4968 6.29999C17.498 6.29999 17.4988 6.29999 17.4994 6.29999C17.4997 6.29999 17.4999 6.29999 17.5001 6.29999C17.5002 6.29999 17.5003 6.29999 17.5003 5.49999C17.5003 4.69999 17.5002 4.69999 17.5001 4.69999C17.4999 4.69999 17.4997 4.69999 17.4994 4.69999C17.4988 4.69999 17.498 4.69999 17.4968 4.69999C17.4944 4.69999 17.4909 4.69999 17.4863 4.69999C17.477 4.69999 17.4631 4.69999 17.4448 4.69999C17.4083 4.69999 17.3541 4.69999 17.2836 4.69999C17.1426 4.7 16.9364 4.7 16.6756 4.7C16.1539 4.7 15.4135 4.7 14.5387 4.7C12.7893 4.7 10.5024 4.7 8.35279 4.7C6.2032 4.7 4.19091 4.7 2.9906 4.7C2.39044 4.7 1.99329 4.7 1.88347 4.7C1.86974 4.7 1.86051 4.7 1.85594 4.7C1.8548 4.7 1.85396 4.7 1.85342 4.7C1.85315 4.7 1.85298 4.7 1.85288 4.7C1.85284 4.7 2.65253 5.49941 1.85408 6.3C1.85314 6.3 1.85296 6.3 1.85632 6.3C1.86608 6.3 1.89511 6.3 1.94477 6.3C2.04406 6.3 2.22573 6.3 2.50031 6.29999L2.50031 4.69999ZM7.05028 5.49994V4.16661H5.45028V5.49994H7.05028ZM7.91695 3.29994H12.0836V1.69994H7.91695V3.29994ZM12.9503 4.16661V5.49994H14.5503V4.16661H12.9503ZM12.0836 3.29994C12.5623 3.29994 12.9503 3.68796 12.9503 4.16661H14.5503C14.5503 2.8043 13.4459 1.69994 12.0836 1.69994V3.29994ZM7.05028 4.16661C7.05028 3.68796 7.4383 3.29994 7.91695 3.29994V1.69994C6.55465 1.69994 5.45028 2.8043 5.45028 4.16661H7.05028ZM2.50031 6.29999C4.70481 6.29998 6.40335 6.29998 8.1253 6.29997C9.84725 6.29996 11.5458 6.29995 13.7503 6.29994L13.7503 4.69994C11.5458 4.69995 9.84724 4.69996 8.12529 4.69997C6.40335 4.69998 4.7048 4.69998 2.50031 4.69999L2.50031 6.29999ZM13.7503 6.29994L17.5003 6.29999L17.5003 4.69999L13.7503 4.69994L13.7503 6.29994ZM7.70029 9.24997V13.75H9.30029V9.24997H7.70029ZM10.7004 9.24997V13.75H12.3004V9.24997H10.7004Z"
                        fill="#F87171"
                      ></path>
                    </svg>
                  </button>
                  
                </td>
                <td>
                  <div
                    v-if="
                      user.isApproved != 1 &&
                      user.isApproved != 2 &&
                      (hasPermission('Users', 'can_edit') || role == 'Admin')
                    "
                    class="flex items-center gap-1"
                  >
                    <button
                      @click="approveOrRejectUser(user.userId, true)"
                      class="py-2 px-3 bg-green-600 hover:bg-green-800 text-white rounded-md"
                    >
                      Approve
                    </button>
                    <button
                      @click="approveOrRejectUser(user.userId, false)"
                      class="py-2 px-3 bg-red-600 hover:bg-red-800 text-white rounded-md"
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <div class="flex justify-left mt-10 space-x-2">
    <span
      >Showing {{ query.PageNumber }} out of {{ totalPages }} Pages ({{
        totalEntries
      }}
      Entries)</span
    >
  </div>
  <div class="flex justify-center mt-10 space-x-2 mb-2">
    <a
      @click="changePage(query.PageNumber - 1)"
      :class="{ 'cursor-not-allowed opacity-50': query.PageNumber === 1 }"
      class="cursor-pointer px-2 py-1 sm:px-4 sm:py-2 mt-2 text-gray-600 border rounded-lg hover:bg-gray-100 focus:outline-none"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1.5em"
        height="1.5em"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="m14 18l-6-6l6-6l1.4 1.4l-4.6 4.6l4.6 4.6z"
        />
      </svg>
    </a>

    <template v-for="page in generatePagination()" :key="page">
      <a
        @click="changePage(page)"
        :class="{
          'ring ring-primary bg-primary/20': query.PageNumber === page,
        }"
        class="cursor-pointer px-2 py-1 sm:px-4 sm:py-2 ml-1 mt-2 text-gray-600 border rounded-lg hover:bg-gray-100 focus:outline-none"
      >
        {{ page }}
      </a>
    </template>

    <a
      @click="changePage(query.PageNumber + 1)"
      :class="{
        'cursor-not-allowed opacity-50': query.PageNumber === totalPages,
      }"
      class="cursor-pointer px-2 py-1 sm:px-4 sm:py-2 mt-2 text-gray-600 border rounded-lg hover:bg-gray-100 focus:outline-none"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1.5em"
        height="1.5em"
        viewBox="0 0 24 24"
      >
        <path fill="currentColor" d="M12.6 12L8 7.4L9.4 6l6 6l-6 6L8 16.6z" />
      </svg>
    </a>
  </div>
  <div
    v-if="showModal"
    class="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]"
  >
    <div class="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 relative">
      <div class="flex items-center pb-3 border-b border-gray-300">
        <h3 class="text-gray-800 text-xl font-bold flex-1">
          Employee Information
        </h3>
        <svg
          @click="showModal = false"
          xmlns="http://www.w3.org/2000/svg"
          class="w-3 ml-2 cursor-pointer shrink-0 fill-gray-400 hover:fill-red-500"
          viewBox="0 0 320.591 320.591"
        >
          <path
            d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
            data-original="#000000"
          ></path>
          <path
            d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
            data-original="#000000"
          ></path>
        </svg>
      </div>

      <div v-if="employee" class="my-6">
        <form class="mx-auto grid max-w-4xl gap-4 sm:grid-cols-4">
          <div class="sm:col-span-2">
            <label
              for="user-id"
              class="mb-2 inline-block text-sm text-gray-800 sm:text-base"
              >User Id</label
            >
            <div
              name="user-id"
              class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
            >
              {{ employee.userId }}
            </div>
          </div>

          <div class="sm:col-span-2">
            <label
              for="employee-id"
              class="mb-2 inline-block text-sm text-gray-800 sm:text-base"
              >EmployeeId</label
            >
            <div
              name="employee-id"
              class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
            >
              {{ employee.employeeId ?? "Null" }}
            </div>
          </div>
          <div class="sm:col-span-4">
            <label
              for="employee-name"
              class="mb-2 inline-block text-sm text-gray-800 sm:text-base"
            >
              Employee Name
            </label>
            <div
              name="employee-name"
              class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
            >
              {{ employee.employeeFullName ?? "Null" }}
            </div>
          </div>
          <div class="sm:col-span-3">
            <label
              for="email"
              class="mb-2 inline-block text-sm text-gray-800 sm:text-base"
            >
              Email
            </label>
            <div
              name="email"
              class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
            >
              {{ employee.email }}
            </div>
          </div>

          <div class="sm:col-span-1">
            <label
              for="username"
              class="mb-2 inline-block text-sm text-gray-800 sm:text-base"
              >Username</label
            >
            <div
              name="username"
              class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
            >
              {{ employee.username }}
            </div>
          </div>

          <div class="sm:col-span-2">
            <label
              for="status"
              class="mb-2 inline-block text-sm text-gray-800 sm:text-base"
              >Status</label
            >
            <div
              v-if="employee.status == 0"
              name="status"
              class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none text-red-600"
            >
              INACTIVE
            </div>
            <div
              v-else
              name="status"
              class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none text-green-600"
            >
              ACTIVE
            </div>
          </div>
          <div class="sm:col-span-2">
            <label
              for="role"
              class="mb-2 inline-block text-sm text-gray-800 sm:text-base"
              >Role</label
            >
            <div
              name="role"
              class="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
            >
              {{ employee.role }}
            </div>
          </div>
          <div class="sm:col-span-1">
            <label
              for="role"
              class="mb-2 inline-block text-sm text-gray-800 sm:text-base"
              >Is Approved</label
            >
            <div
              v-if="employee.isApproved == 0"
              name="status"
              class="w-full rounded border bg-gray-50 px-3 py-2 outline-none text-amber-600"
            >
              PENDING
            </div>
            <div
              v-else-if="employee.isApproved == 1"
              name="status"
              class="w-full rounded border bg-gray-50 px-3 py-2 outline-none text-green-600"
            >
              APPROVED
            </div>
            <div
              v-else
              name="status"
              class="w-full rounded border bg-gray-50 px-3 py-2 outline-none text-red-600"
            >
              REJECTED
            </div>
          </div>
        </form>
      </div>

      <div class="border-t border-gray-300 pt-6 flex justify-end gap-4">
        <button
          type="button"
          @click="showModal = false"
          class="px-4 py-2 rounded-lg text-gray-800 text-sm border-none outline-none tracking-wide bg-gray-200 hover:bg-gray-300 active:bg-gray-200"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  getUsers,
  users,
  query,
  toggleSort,
  generatePagination,
  changePage,
  totalPages,
  totalEntries,
} from "~/js/fetchUsersList";
import { ref } from "vue";
import { getToken } from "~/js/fetchToken";
import { API_BASE_URL } from "~/config";
import { usePermissions } from "#imports";
const { hasPermission } = usePermissions();
import { useAuth } from "~/composables/useAuth";

const { role, fetchRole } = useAuth();
const { $swal } = useNuxtApp();
const showModal = ref(false);
const defaultImage = ref(
  "http://localhost:3000/_nuxt/static/images/UserIcon.png"
);
const employee = ref([]);
function clearSearch() {
  query.value.Search = "";
  getUsers();
}
function clearStatus() {
  query.value.Status = "";
  getUsers();
}
function clearApproved() {
  query.value.IsApproved = "";
  getUsers();
}
const viewEmployee = async (userId) => {
  showModal.value = true;
  try {
    const token = getToken();
    if (!token) throw new Error("No token found");

    const uri = `${API_BASE_URL}/api/Employee/${userId}`;
    const response = await $fetch(uri, {
      headers: { Authorization: `Bearer ${token}` },
    });

    employee.value = response;
  } catch (error) {
    console.error("Error viewing employee:", error);
  }
};
const approveOrRejectUser = async (userId, isApproved) => {
  try {
    const token = getToken();
    if (!token) throw new Error("No token found");

    const action = isApproved ? "approve" : "reject";
    const actionText = isApproved ? "approved" : "rejected";

    const result = await $swal.fire({
      title: `Confirm ${actionText}`,
      text: `Are you sure you want to ${action} this user?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `Yes, ${action} it!`,
      cancelButtonText: "No, cancel",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      let isLoading = true;

      // Show loading alert
      const loadingSwal = $swal.fire({
        title: "Processing...",
        text: `Please wait while we ${action} the user.`,
        allowOutsideClick: false,
        didOpen: () => {
          $swal.showLoading();
        },
      });

      const uri = `${API_BASE_URL}/api/Employee`;

      try {
        const response = await $fetch(uri, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: { userId, isApproved },
        });
        // Close loading and show success message
        $swal.fire({
          title: "Success!",
          text: `User has been ${actionText}.`,
          icon: "success",
        });

        await getUsers();
      } catch (fetchError) {
        console.error("Fetch request failed:", fetchError);
        $swal.fire({
          title: "Error!",
          text: "Something went wrong. Please try again.",
          icon: "error",
        });
      } finally {
        isLoading = false;
      }
    }
  } catch (error) {
    console.error("Main function error:", error);
  }
};


const isOpen = ref(false);
const isApprovedOpen = ref(false);

onMounted(async () => {
  await getUsers();
  await fetchRole(); // Ensure role is loaded when the component is mounted
});
</script>

<style></style>
