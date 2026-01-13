<template>
    <header class="app-header">
        <div class="header-container">
            <h1 class="logo">
                <RouterLink to="/movie">🎬 MovieTime</RouterLink>
            </h1>
            <nav>
                <RouterLink to="/" class="nav-link">Home</RouterLink>
                <RouterLink to="/movie" class="nav-link">Movies</RouterLink>
            </nav>
        </div>
    </header>
</template>

<style scoped>
.app-header {
    background-color: #2c3e50;
    color: white;
    padding: 1rem 0;
}

.header-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo a {
    text-decoration: none;
    color: #42b983;
    transition: 0.3s;
}

.logo a:hover {
    color: #3aa876;
}

.nav-link {
    color: white;
    margin-left: 20px;
    font-size: 1.1rem;
}

.nav-link:hover {
    color: #42b983;
}

.router-link-active {
    color: #42b983;
    font-weight: bold;
}
</style>