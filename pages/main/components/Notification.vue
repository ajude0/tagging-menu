<template>
    <div v-if="visible" :class="[baseClasses, typeClasses, locationClass, 'notification']"
        @animationend="handleAnimationEnd">
        <svg :viewBox="iconViewBox" :class="iconClasses">
            <path :fill="iconColor" :d="iconPath"></path>
        </svg>
        <span :class="messageClasses">{{ message }}</span>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { defineEmits, defineProps } from 'vue'

const props = defineProps({
    type: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    locationClass: {
        type: String,
        default: 'top-10 right-10'
    },
    duration: {
        type: Number,
        default: 3000
    }
})

const emit = defineEmits(['notification-end'])

const visible = ref(false)

function close() {
    visible.value = false
}

function handleAnimationEnd(event) {
    if (event.animationName === 'fadeOut') {
        // Notify parent to reset visibility
        emit('notification-end')
    }
}

watch(visible, (newVal) => {
    if (newVal) {
        setTimeout(() => {
            visible.value = false
        }, props.duration)
    }
})

onMounted(() => {
    visible.value = true
})

const baseClasses = 'px-6 py-3 mx-2 my-3 rounded-md text-lg flex items-center mx-auto max-w-lg'

const typeClasses = computed(() => {
    switch (props.type) {
        case 'success':
            return 'bg-green-200 text-green-800'
        case 'error':
            return 'bg-red-200 text-red-800'
        case 'warning':
            return 'bg-orange-200 text-yellow-800'
        case 'info':
            return 'bg-blue-200 text-blue-800'
        default:
            return ''
    }
})

const iconViewBox = '0 0 24 24'
const iconClasses = 'w-5 h-5 sm:w-5 sm:h-5 mr-3'
const iconColor = 'currentColor'

const iconPath = computed(() => {
    switch (props.type) {
        case 'success':
            return 'M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z'
        case 'error':
            return 'M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z'
        case 'warning':
            return 'M23.119,20,13.772,2.15h0a2,2,0,0,0-3.543,0L.881,20a2,2,0,0,0,1.772,2.928H21.347A2,2,0,0,0,23.119,20ZM11,8.423a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Zm1.05,11.51h-.028a1.528,1.528,0,0,1-1.522-1.47,1.476,1.476,0,0,1,1.448-1.53h.028A1.527,1.527,0,0,1,13.5,18.4,1.475,1.475,0,0,1,12.05,19.933Z'
        case 'info':
            return 'M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm.25,5a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,12.25,5ZM14.5,18.5h-4a1,1,0,0,1,0-2h.75a.25.25,0,0,0,.25-.25v-4.5a.25.25,0,0,0-.25-.25H10.5a1,1,0,0,1,0-2h1a2,2,0,0,1,2,2v4.75a.25.25,0,0,0,.25.25h.75a1,1,0,1,1,0,2Z'
        default:
            return ''
    }
})
</script>

<style scoped>
@keyframes slideIn {
    from {
        transform: translateY(-100%);
        opacity: 0;
    }

    to {
        transform: translateY(0);
        opacity: 1;
    }
}

@keyframes fadeOut {
    from {
        opacity: 1;
    }

    to {
        opacity: 0;
    }
}

.notification {
    position: fixed;
    z-index: 1000;
    animation: slideIn 0.5s forwards, fadeOut 0.5s forwards 2.5s;
}
</style>
