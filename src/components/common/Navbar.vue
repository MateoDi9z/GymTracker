<script setup lang="ts">
const links = [
    {
        name: "Home",
        to: "/"
    },
    {
        name: "Agregar Serie",
        to: "/addSerie"
    },
    {
        name: "About",
        to: "/about"
    },
]
</script>

<template>
    <header class="navbar bg-violet-800 text-white">

        <div class="navbar-start">
            <div class="dropdown lg:hidden">
                <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                </div>
                <ul tabindex="0"
                    class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                    <li v-for="link in links">
                        <RouterLink :to="link.to">{{ link.name }}</RouterLink>
                    </li>
                </ul>
            </div>


            <div class="hidden lg:flex">
                <ul class="menu menu-horizontal px-1">
                    <li>
                        <RouterLink class="rounded-xl font-bold" to="/">Home
                        </RouterLink>
                    </li>
                    <!--<li>

                            <details>
                                <summary>Series</summary>
                                <ul class="p-2">
                                    <li><a>Ver</a></li>
                                    <li><a>Agregar</a></li>
                                </ul>
                            </details>
                </li>-->
                    <li>
                        <RouterLink class="rounded-xl font-bold" to="/about">About</RouterLink>
                    </li>
                    <li>
                        <RouterLink class="rounded-xl font-bold" to="/addSerie">Add
                            Serie</RouterLink>
                    </li>
                </ul>
            </div>
        </div>

        <div class="navbar-center">
            <RouterLink to="/">
                <button class="btn btn-ghost text-xl text-white" style="text-decoration: none !important;">Gym Track
                    App</button>
            </RouterLink>
        </div>

        <div class="navbar-end">
            <!-- <a class="btn">Refresh</a> -->
        </div>
    </header>
</template>

<style scoped>
header .menu a.router-link-active {
    color: #fff;
    opacity: .8;
    text-decoration-line: underline;
    text-decoration-thickness: auto;
}

header a.router-link-exact-active:hover {
    background-color: transparent;
}

header a:first-of-type {
    border: 0;
}
</style>