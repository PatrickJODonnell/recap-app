<template>
    <div class="container">
        <h1 class="headline">
            Smarter News. <br />
            <span class="highlight">Tailored to You.</span>
        </h1>
        <p class="subtext">
            Cut through the noise. Get custom-picked news stories sourced from both top-tier articles and trending
            videos —
            all based on your interests.
        </p>
        <NuxtLink to="/auth?mode=login" class="login-button">Get Started</NuxtLink>
    </div>
</template>

<style scoped>
.container {
    min-width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 0 20px;
    background-color: #f9f9f9;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.headline {
    font-size: 3rem;
    font-weight: 800;
    color: #222;
    margin-bottom: 1rem;
    line-height: 1.2;
}

.highlight {
    color: #007BFF;
}

.subtext {
    font-size: 1.125rem;
    color: #555;
    max-width: 600px;
    margin-bottom: 2rem;
}

.login-button {
    display: inline-block;
    padding: 12px 24px;
    font-size: 1rem;
    background-color: #007BFF;
    color: white;
    text-decoration: none;
    border-radius: 6px;
    transition: background-color 0.3s ease;
}

.login-button:hover {
    background-color: #0056b3;
}
</style>
