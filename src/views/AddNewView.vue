<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../api/axios'

const router = useRouter()

const form = reactive({ title: '', content: '', category: '' })
const errors = ref({})

function validate() {
  errors.value = {}
  if (form.title.trim().length < 20) errors.value.title = 'Title must be at least 20 characters.'
  if (form.content.trim().length < 200) errors.value.content = 'Content must be at least 200 characters.'
  if (form.category.trim().length < 3) errors.value.category = 'Category must be at least 3 characters.'
  return Object.keys(errors.value).length === 0
}

async function submit(status) {
  if (!validate()) return
  try {
    await api.post('/article/', { ...form, status })
    router.push('/')
  } catch (e) {
    console.error(e)
  }
}
</script>

<template>
  <div class="mx-auto max-w-2xl">
    <h1 class="mb-6 text-2xl font-bold text-slate-800">Add New</h1>

    <form @submit.prevent="submit('Publish')" class="space-y-5 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <label class="mb-1 block text-sm font-medium text-slate-700">Title</label>
        <input
          v-model="form.title"
          type="text"
          placeholder="At least 20 characters"
          class="w-full rounded border px-3 py-2 text-sm outline-none focus:border-slate-500"
        />
        <p v-if="errors.title" class="mt-1 text-xs text-red-500">{{ errors.title }}</p>
      </div>

      <div>
        <label class="mb-1 block text-sm font-medium text-slate-700">Content</label>
        <textarea
          v-model="form.content"
          rows="8"
          placeholder="At least 200 characters"
          class="w-full rounded border px-3 py-2 text-sm outline-none focus:border-slate-500"
        ></textarea>
        <p v-if="errors.content" class="mt-1 text-xs text-red-500">{{ errors.content }}</p>
      </div>

      <div>
        <label class="mb-1 block text-sm font-medium text-slate-700">Category</label>
        <input
          v-model="form.category"
          type="text"
          placeholder="At least 3 characters"
          class="w-full rounded border px-3 py-2 text-sm outline-none focus:border-slate-500"
        />
        <p v-if="errors.category" class="mt-1 text-xs text-red-500">{{ errors.category }}</p>
      </div>

      <div class="flex justify-end gap-3 pt-2">
        <button
          type="submit"
          class="rounded bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600"
        >
          Publish
        </button>
        <button
          type="button"
          @click="submit('Draft')"
          class="rounded bg-slate-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
        >
          Draft
        </button>
      </div>
    </form>
  </div>
</template>