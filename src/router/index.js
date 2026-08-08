import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'dashboard', component: () => import('../views/DashboardView.vue') },
  { path: '/add', name: 'add', component: () => import('../views/AddNewView.vue') },
  { path: '/edit/:id', name: 'edit', component: () => import('../views/EditView.vue') },
  { path: '/preview', name: 'preview', component: () => import('../views/PreviewView.vue') },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})