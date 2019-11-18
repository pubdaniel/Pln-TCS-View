<template>
    <div>
        
    </div>
</template>
<script>
export default {
    created() {
        localStorage.setItem("key", null);
        this.$router.push("/");

    }
}
</script>