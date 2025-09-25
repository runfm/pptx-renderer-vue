<template>
  <section class="layout layout--default">
    <nav>Navigation</nav>
    <main>
      <router-view />
    </main>
  </section>
</template>

<style scoped>
nav {
  padding: 12px;
  border-bottom: 1px solid var(--color-grey-80);
  position: sticky;
  top: 0;
  background-color: white;
}
main {
  min-height: 150vh;
}
</style>
