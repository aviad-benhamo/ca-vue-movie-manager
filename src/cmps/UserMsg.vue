<template>
    <div v-if="msg" class="user-msg" :class="msg.type">
        <p>{{ msg.txt }}</p>
    </div>
</template>

<script>
import { eventBus } from '@/services/event-bus.service.js'

export default {
    data() {
        return {
            msg: null
        }
    },
    created() {
        this.unsubscribe = eventBus.on('user-msg', (msg) => {
            this.msg = msg
            setTimeout(() => {
                this.msg = null
            }, 2000)
        })
    },
    unmounted() {
        // Clean up the event listener when the component is destroyed
        if (this.unsubscribe) this.unsubscribe()
    }
}
</script>

<style scoped>
.user-msg {
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: #333;
    color: white;
    padding: 10px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    z-index: 9999;
    min-width: 200px;
    text-align: center;
}

.user-msg.success {
    background-color: #42b983;
    /* Green */
}

.user-msg.error {
    background-color: #e63946;
    /* Red */
}
</style>