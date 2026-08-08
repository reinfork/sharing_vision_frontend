<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const links = [
  { to: '/', label: 'All Posts' },
  { to: '/add', label: 'Add New' },
  { to: '/preview', label: 'Preview' },
]
</script>

<template>
  <header class="bg-white shadow-sm">
    <nav class="mx-auto flex max-w-6xl items-center gap-6 px-4 py-4">
      <span class="text-lg font-bold text-slate-800">Post Article</span>
      <RouterLink
        v-for="l in links"
        :key="l.to"
        :to="l.to"
        class="rounded px-3 py-1.5 text-sm font-medium transition"
        :class="
          route.path === l.to
            ? 'bg-slate-800 text-white'
            : 'text-slate-600 hover:bg-slate-100'
        "
      >
        {{ l.label }}
      </RouterLink>
    </nav>
  </header>
</template>