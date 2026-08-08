<script setup>
import { ref, computed, onMounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import api from '../api/axios'

const router = useRouter()

const tabs = [
  { key: 'Publish', label: 'Published' },
  { key: 'Draft', label: 'Drafts' },
  { key: 'Thrash', label: 'Trashed' },
]
const active = ref('Publish')
const articles = ref([])
const loading = ref(true)

const filtered = computed(() =>
  articles.value.filter((a) => a.status === active.value)
)

async function load() {
  loading.value = true
  try {
    articles.value = await api.get('/article/1000000/0')
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

async function thrash(id) {
  await api.put(`/article/${id}`, { status: 'Thrash' })
  await load()
}

onMounted(load)
</script>

<template>
  <div>
    <h1 class="mb-6 text-2xl font-bold text-slate-800">All Posts</h1>

    <div class="mb-4 flex gap-2 border-b border-slate-200">
      <button
        v-for="t in tabs"
        :key="t.key"
        @click="active = t.key"
        class="rounded-t px-4 py-2 text-sm font-medium transition"
        :class="
          active === t.key
            ? 'border-b-2 border-slate-800 text-slate-800'
            : 'text-slate-500 hover:text-slate-700'
        "
      >
        {{ t.label }}
      </button>
    </div>

    <p v-if="loading" class="text-slate-500">Loading...</p>
    <p v-else-if="filtered.length === 0" class="py-8 text-center text-slate-400">
      No posts in this tab.
    </p>

    <div v-else class="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <table class="min-w-full divide-y divide-slate-200">
        <thead class="bg-slate-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-semibold uppercase text-slate-500">Title</th>
            <th class="px-6 py-3 text-left text-xs font-semibold uppercase text-slate-500">Category</th>
            <th class="px-6 py-3 text-right text-xs font-semibold uppercase text-slate-500">Action</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-200">
          <tr v-for="a in filtered" :key="a.id">
            <td class="px-6 py-3 text-sm font-medium text-slate-800">{{ a.title }}</td>
            <td class="px-6 py-3 text-sm text-slate-600">{{ a.category }}</td>
            <td class="px-6 py-3 text-right">
              <button
                type="button"
                @click="thrash(a.id)"
                class="mr-2 rounded bg-red-500 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-red-600"
              >
                Thrash
              </button>
              <RouterLink
                :to="`/edit/${a.id}`"
                class="rounded bg-slate-800 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-slate-700"
              >
                Edit
              </RouterLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>