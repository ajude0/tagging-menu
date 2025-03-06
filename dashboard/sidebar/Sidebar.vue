<script setup>
import { sidebarOpen } from "../store";
const router = useRouter();
import { usePermissions } from "#imports";
import { useAuth } from "~/composables/useAuth";

const { role } = useAuth();
const { hasMenuAccess } = usePermissions();

defineProps({
  mobileOrientation: {
    type: String,
    default: "end",
  },
});

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
  
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

const isActive = ref(true);
const open = ref(false);
const menu = ref(null);

const style = {
  mobileOrientation: {
    start: "left-0",
    end: "right-0 lg:left-0",
  },
};

const handleClickOutside = (event) => {
  if (!sidebarOpen.value && menu.value && !menu.value.contains(event.target)) {
    open.value = false;
  }
};

const toggleOpen = () => {
  open.value = !open.value;
};

function dashboard() {
  router.push("/main/dashboard");
}

function Menu() {
  router.push("/main/menu");
}

function modal() {
  router.push("/main/modal");
}

function buttons() {
  router.push("/main/buttons");
}

function table() {
  router.push("/main/table");
}

function cards() {
  router.push("/main/cards");
}

function forms() {
  router.push("/main/forms");
}

function users() {
  router.push("/main/user-management");
}

function loading() {
  router.push("/main/loading");
}
function Permission() {
  router.push("/main/permission");
}
</script>

<template>
  <div class="app">
    <aside
      class="sidebar-item sidebar scrollbar flex flex-col h-screen px-5 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l lg:relative lg:z-40 lg:block shadow-lg"
      :class="{
        'relative z-40 w-8/12 sm:w-5/12 md:w-64 transition-all duration-300 ease-in overflow-y-auto visible':
          sidebarOpen,
        'hidden lg:w-20 transition-all duration-300 ease-out': !sidebarOpen,
        [style.mobileOrientation[mobileOrientation]]: true,
      }"
    >
      <!-- <a class="flex ">
        <p v-if="sidebarOpen" dir="ltr" @click="dashboard()" class="cursor-pointer text-white bg-cyan-400 p-2 flex-shrink">LOGO</p><p dir="rtl" class="bg-cyan-400 text-white p-2 flex-shrink">TEST</p>
      </a> -->

      <div class="flex justify-center">
        <img
          v-if="sidebarOpen"
          src="/static/images/sbuLogo.png"
          class="h-10 mr-3 h-14 w-auto"
          alt="DatabridgeLogo"
        />
      </div>

      <div class="flex flex-col justify-between flex-1 mt-6">
        <nav class="-mx-3 space-y-6">
          <div class="space-y-3">
            <label
              :class="sidebarOpen ? 'label-normal' : 'label-small'"
              class="px-3 text-xs text-black uppercase"
              >Menu</label
            >
            <a
              v-if="hasMenuAccess('Dashboard') || role == 'Admin'"
              @click="dashboard"
              :class="[
                'cursor-pointer flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:black-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700',
                { 'bg-gray-200': $route.path === '/main/dashboard' },
              ]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.2em"
                height="1.2em"
                viewBox="0 0 24 24"
              >
                <rect width="9" height="9" x="1.5" y="1.5" fill="black" rx="1">
                  <animate
                    id="svgSpinnersBlocksScale0"
                    attributeName="x"
                    begin="0;svgSpinnersBlocksScale1.end+0.15s"
                    dur="0.6s"
                    keyTimes="0;.2;1"
                    values="1.5;.5;1.5"
                  />
                  <animate
                    attributeName="y"
                    begin="0;svgSpinnersBlocksScale1.end+0.15s"
                    dur="0.6s"
                    keyTimes="0;.2;1"
                    values="1.5;.5;1.5"
                  />
                  <animate
                    attributeName="width"
                    begin="0;svgSpinnersBlocksScale1.end+0.15s"
                    dur="0.6s"
                    keyTimes="0;.2;1"
                    values="9;11;9"
                  />
                  <animate
                    attributeName="height"
                    begin="0;svgSpinnersBlocksScale1.end+0.15s"
                    dur="0.6s"
                    keyTimes="0;.2;1"
                    values="9;11;9"
                  />
                </rect>
                <rect width="9" height="9" x="13.5" y="1.5" fill="black" rx="1">
                  <animate
                    attributeName="x"
                    begin="svgSpinnersBlocksScale0.begin+0.15s"
                    dur="0.6s"
                    keyTimes="0;.2;1"
                    values="13.5;12.5;13.5"
                  />
                  <animate
                    attributeName="y"
                    begin="svgSpinnersBlocksScale0.begin+0.15s"
                    dur="0.6s"
                    keyTimes="0;.2;1"
                    values="1.5;.5;1.5"
                  />
                  <animate
                    attributeName="width"
                    begin="svgSpinnersBlocksScale0.begin+0.15s"
                    dur="0.6s"
                    keyTimes="0;.2;1"
                    values="9;11;9"
                  />
                  <animate
                    attributeName="height"
                    begin="svgSpinnersBlocksScale0.begin+0.15s"
                    dur="0.6s"
                    keyTimes="0;.2;1"
                    values="9;11;9"
                  />
                </rect>
                <rect
                  width="9"
                  height="9"
                  x="13.5"
                  y="13.5"
                  fill="black"
                  rx="1"
                >
                  <animate
                    attributeName="x"
                    begin="svgSpinnersBlocksScale0.begin+0.3s"
                    dur="0.6s"
                    keyTimes="0;.2;1"
                    values="13.5;12.5;13.5"
                  />
                  <animate
                    attributeName="y"
                    begin="svgSpinnersBlocksScale0.begin+0.3s"
                    dur="0.6s"
                    keyTimes="0;.2;1"
                    values="13.5;12.5;13.5"
                  />
                  <animate
                    attributeName="width"
                    begin="svgSpinnersBlocksScale0.begin+0.3s"
                    dur="0.6s"
                    keyTimes="0;.2;1"
                    values="9;11;9"
                  />
                  <animate
                    attributeName="height"
                    begin="svgSpinnersBlocksScale0.begin+0.3s"
                    dur="0.6s"
                    keyTimes="0;.2;1"
                    values="9;11;9"
                  />
                </rect>
                <rect width="9" height="9" x="1.5" y="13.5" fill="black" rx="1">
                  <animate
                    id="svgSpinnersBlocksScale1"
                    attributeName="x"
                    begin="svgSpinnersBlocksScale0.begin+0.45s"
                    dur="0.6s"
                    keyTimes="0;.2;1"
                    values="1.5;.5;1.5"
                  />
                  <animate
                    attributeName="y"
                    begin="svgSpinnersBlocksScale0.begin+0.45s"
                    dur="0.6s"
                    keyTimes="0;.2;1"
                    values="13.5;12.5;13.5"
                  />
                  <animate
                    attributeName="width"
                    begin="svgSpinnersBlocksScale0.begin+0.45s"
                    dur="0.6s"
                    keyTimes="0;.2;1"
                    values="9;11;9"
                  />
                  <animate
                    attributeName="height"
                    begin="svgSpinnersBlocksScale0.begin+0.45s"
                    dur="0.6s"
                    keyTimes="0;.2;1"
                    values="9;11;9"
                  />
                </rect>
              </svg>
              <span
                v-if="sidebarOpen"
                class="mx-2 text-sm font-medium"
                >Dashboard</span
              >
            </a>
            <a
            v-if="hasMenuAccess('Users') || role == 'Admin'"
              @click="users"
              :class="[
                'cursor-pointer flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:black-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700',
                { 'bg-gray-200': $route.path === '/main/user-management' },
              ]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.2em"
                height="1.2em"
                viewBox="0 0 24 24"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                >
                  <path
                    stroke-dasharray="2 4"
                    stroke-dashoffset="6"
                    d="M12 21c-4.97 0 -9 -4.03 -9 -9c0 -4.97 4.03 -9 9 -9"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      dur="0.6s"
                      repeatCount="indefinite"
                      values="6;0"
                    />
                  </path>
                  <path
                    stroke-dasharray="32"
                    stroke-dashoffset="32"
                    d="M12 3c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9"
                  >
                    <animate
                      fill="freeze"
                      attributeName="stroke-dashoffset"
                      begin="0.1s"
                      dur="0.4s"
                      values="32;0"
                    />
                  </path>
                  <path
                    stroke-dasharray="10"
                    stroke-dashoffset="10"
                    d="M12 16v-7.5"
                  >
                    <animate
                      fill="freeze"
                      attributeName="stroke-dashoffset"
                      begin="0.5s"
                      dur="0.2s"
                      values="10;0"
                    />
                  </path>
                  <path
                    stroke-dasharray="6"
                    stroke-dashoffset="6"
                    d="M12 8.5l3.5 3.5M12 8.5l-3.5 3.5"
                  >
                    <animate
                      fill="freeze"
                      attributeName="stroke-dashoffset"
                      begin="0.7s"
                      dur="0.2s"
                      values="6;0"
                    />
                  </path>
                </g>
              </svg>
              <span
                v-if="sidebarOpen"
                class="mx-2 text-sm font-medium"
                >User Management</span
              >
            </a>
            <div class="sidebar-dropdown" ref="menu">
              <a
                href="#"
                v-if="hasMenuAccess('Menu') ||hasMenuAccess('Permission') || role == 'Admin' "
                @click.prevent="toggleOpen"
                class="cursor-pointer flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:black-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
                :class="{ '': isActive || open }"
                role="button"
                aria-haspopup="true"
                :aria-expanded="open || isActive ? 'true' : 'false'"
              >
                <span aria-hidden="false">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.2em"
                    height="1.2em"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      d="m14 23l6-6m1-3a2 2 0 1 0 2 2M17 4h1v1h-1zm-7 19H3V1h18v10M3 13h14M3 18h10M3 8h18"
                    />
                  </svg>
                </span>
                <span
                  v-if="sidebarOpen"
                  class="mx-2 text-sm font-medium"
                  >Maintenance</span
                >
                <span aria-hidden="true" class="ml-auto">
                  <svg
                    class="w-4 h-4 transition-transform transform"
                    :class="{ 'rotate-180': open }"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </a>
              <div
                v-if="open"
                :class="[
                  'mt-2 space-y-2 px-7',
                  { 'child-dropdown mt-2 space-y-2': !sidebarOpen },
                ]"
                role="menu"
                aria-label="Dropdown Menu"
              >
                <a v-if="hasMenuAccess('Menu') || role =='Admin'"
                  @click="Menu"
                  :class="[
                    'cursor-pointer flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:black-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700',
                    { 'bg-gray-200': $route.path === '/main/menu' },
                  ]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"
                    />
                  </svg>
                  <span
                    v-if="sidebarOpen || open"
                    class="mx-2 text-sm font-medium"
                    >Menu</span
                  >
                </a>
                <a
                v-if="hasMenuAccess('Permission') || role =='Admin'"
                  @click="Permission"
                  :class="[
                    'cursor-pointer flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:black-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700',
                    { 'bg-gray-200': $route.path === '/main/permission' },
                  ]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"
                    />
                  </svg>
                  <span
                    v-if="sidebarOpen || open"
                    class="mx-2 text-sm font-medium"
                    >Permission</span
                  >
                </a>
              </div>
            </div>
            <!-- Sidebar Menu -->
            <!-- Sidebar Menu -->
            <!-- <a @click="users"
              :class="['cursor-pointer flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:black-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700']">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
              </svg>
              <span v-if="sidebarOpen" class="mx-2 text-sm font-medium text-black">Dropdown</span>
            </a> -->
          </div>
          <!-- <div class="space-y-3">
            <label :class="sidebarOpen ? 'label-normal' : 'label-small'"
              class="px-3 text-xs text-black uppercase ">Components</label>
          
            <a @click="modal"
              :class="['cursor-pointer flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:black-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700', { 'bg-gray-200': $route.path === '/main/modal' }]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
              </svg>
              <span v-if="sidebarOpen" class="mx-2 text-sm font-medium text-black dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">Modal</span>
            </a>
            <a @click="buttons"
              :class="['cursor-pointer flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:black-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700', { 'bg-gray-200': $route.path === '/main/buttons' }]">
              <svg xmlns=" http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
              </svg>
              <span v-if="sidebarOpen" class="mx-2 text-sm font-medium text-black dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">Buttons</span>
            </a>

            <a @click="table"
              :class="['cursor-pointer flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:black-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700', { 'bg-gray-200': $route.path === '/main/table' }]">
              <svg xmlns=" http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
              </svg>
              <span v-if="sidebarOpen" class="mx-2 text-sm font-medium text-black dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">Table</span>
            </a>

            <a @click="cards"
              :class="['cursor-pointer flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:black-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700', { 'bg-gray-200': $route.path === '/main/cards' }]">
              <svg xmlns=" http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
              </svg>
              <span v-if="sidebarOpen" class="mx-2 text-sm font-medium text-black dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">Cards</span>
            </a>

            <a @click="forms"
              :class="['cursor-pointer flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:black-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700', { 'bg-gray-200': $route.path === '/main/forms' }]">

              <svg xmlns=" http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
              </svg>
              <span v-if="sidebarOpen" class="mx-2 text-sm font-medium text-black dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">Forms</span>
            </a>

            <a @click="loading"
              :class="['cursor-pointer flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:black-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700', { 'bg-gray-200': $route.path === '/main/loading' }]">

              <svg xmlns=" http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
              </svg>
              <span v-if="sidebarOpen" class="mx-2 text-sm font-medium text-black dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">Loading</span>
            </a>
          </div> -->
        </nav>
      </div>
    </aside>
  </div>
</template>

<style scoped>
.scrollbar::-webkit-scrollbar {
  width: 0;
  background: transparent;
}

.scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.hidden {
  padding-right: -20px;
  transition: width 0.3s ease-out, opacity 0.3s ease-out;
}

.visible {
  opacity: 1;
  transition: width 0.3s ease-in, opacity 0.3s ease-in;
}

.label-normal {
  font-size: 0.75rem;
  padding-left: 0.75rem;
}

.label-small {
  font-size: 0.65rem;
  padding-left: 0.01rem;
}

.sidebar {
  position: relative;
  overflow: visible;
}

.child-dropdown {
  position: absolute;
  top: 0;
  left: calc(100% + 10px);
  background-color: #f7f7f7;
  width: 200px;
  padding: 10px;
  box-shadow: 0 0 15 px rgba(0, 0, 0, 0.1);
  z-index: 9999;
}

.sidebar-item {
  position: relative;
}

.sidebar-dropdown {
  position: relative;
}

.sidebar-item .child-dropdown {
  top: 50%;
  transform: translateY(-50%);
}

@media (max-width: 768px) {
  .sidebar-item {
    position: relative;
    width: 250px;
  }
  .sidebar {
    position: relative;
    overflow: visible;
    padding-right: 20px;
  }
  .sidebar-open {
    display: block;
  }
  .sidebar-closed {
    display: none;
  }
  .child-dropdown {
    position: absolute;
    left: 0;
    width: 100%;
  }
}
</style>
