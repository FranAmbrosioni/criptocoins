import { createRouter, createWebHistory } from 'vue-router'
import Situacion from '../views/Situacion.vue'
import Compra from '../views/Compra.vue'
import Venta from '../views/Venta.vue'

const routes = [
  {
    path: '/',
    name: 'Situacion',
    component: Situacion
  },
  {
    path: '/Compra',
    name: 'Compra',
    component:Compra
  },
  {
    path: '/Venta',
    name: 'Venta',
    component:Venta
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
