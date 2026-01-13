<template>
    <section class="home-page">
        <h1>Welcome to MovieTime 🎬</h1>
        <p>Manage your favorite movies efficiently and easily.</p>

        <div class="actions">
            <button @click="$router.push('/movie')" class="btn btn-primary">Start Managing Movies</button>
        </div>
    </section>
</template>

<style scoped>
.home-page {
    text-align: center;
    margin-top: 50px;
}

h1 {
    font-size: 2.5rem;
    margin-bottom: 20px;
    color: var(--color-heading);
}

p {
    font-size: 1.2rem;
    color: #666;
    margin-bottom: 30px;
}
</style>