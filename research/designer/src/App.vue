<template>
    <div id="app">
        <div id="nav">
            <router-link to="/">Home</router-link> |
            <router-link to="/about">About</router-link>
        </div>
        <router-view />
    </div>
</template>

<style>
#app {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}

#nav {
    padding: 10px;
    width: 100%;
    height: 40px;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}
</style>
