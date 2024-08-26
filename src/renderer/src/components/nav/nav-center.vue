<template>
    <div class="center-navigation app-div">
        <router-view></router-view>
    </div>    
</template>

<script setup>
 
</script>

<style scoped>
@import url("./nav-css.css");
.center-navigation{
    position: absolute;
    left: var(--left-nav-width);
    top: var(--top-nav--height);
    width: calc(100% - var(--left-nav-width));
    height: calc(100% - var(--top-nav--height));
    box-sizing: border-box;
    padding: 25px 20px;
    padding-bottom: 0px;
}
</style>