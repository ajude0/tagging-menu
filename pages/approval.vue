<template>
  <div class="bg-gray-50 min-h-screen flex items-center justify-center p-4">
    <div class="max-w-3xl w-full text-center space-y-7 bg-">
      <div class="relative">
        <img
          src="https://media.tenor.com/MMZ91nXAGU8AAAAM/ja.gif"
          alt="Error Illustration"
          class="w-72 h-72 mx-auto object-cover rounded-md shadow-lg"
        />
        <div class="absolute inset-0"></div>
      </div>

      <div class="space-y-10">
        <h1
          class="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text animate-pulse"
        >
          Thank You for Registering
        </h1>

        <p class="text-gray-600 max-w-md mx-auto">
          Your registration request has been successfully submitted. Please wait
          for our team to review and approve your account.
        </p>
      </div>

      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a
          href="#"
          class="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity focus:ring-4 focus:ring-blue-300 focus:outline-none"
        >
          Log In
        </a>
       
      </div>

     
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "empty",
});

</script>

<style></style>
