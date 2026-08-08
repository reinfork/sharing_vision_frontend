<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import api from '../api/axios'

const limit = ref(5)
const offset = ref(0)
const rows = ref([])
const loading = ref(true)

const posts = computed(() => rows.value.filter((p) => p.status === 'Publish'))

async function load() {
  loading.value = true
  try {
    rows.value = await api.get(`/article/${limit.value}/${offset.value}`)
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

function previous() {
  offset.value = Math.max(0, offset.value - limit.value)
  load()
}

function next() {
  offset.value += limit.value
  load()
}

onMounted(load)
</script>

<template>
  <div>
    <h1 class="mb-6 text-2xl font-bold text-slate-800">Preview</h1>

    <p v-if="loading" class="text-slate-500">Loading...</p>
    <p v-else-if="posts.length === 0" class="py-8 text-center text-slate-400">No published posts.</p>

    <div v-else class="space-y-4">
      <article
        v-for="p in posts"
        :key="p.id"
        class="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
      >
        <div class="mb-1 flex items-center justify-between">
          <h2 class="text-lg font-semibold text-slate-800">{{ p.title }}</h2>
          <span class="rounded bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
            {{ p.category }}
          </span>
        </div>
        <p class="whitespace-pre-wrap text-sm text-slate-600">{{ p.content }}</p>
        <RouterLink :to="`/edit/${p.id}`" class="mt-3 inline-block text-sm font-medium text-slate-700 underline">
          Edit
        </RouterLink>
      </article>
    </div>

    <div class="mt-6 flex items-center justify-between">
      <button
        type="button"
        @click="previous"
        :disabled="offset === 0"
        class="rounded bg-slate-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Previous
      </button>
      <span class="text-sm text-slate-500">Offset {{ offset }} · Limit {{ limit }}</span>
      <button
        type="button"
        @click="next"
        class="rounded bg-slate-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
      >
        Next
      </button>
    </div>
  </div>
</template>