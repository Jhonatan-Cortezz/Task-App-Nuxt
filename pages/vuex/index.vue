<template>
  <div class="container">
    <h2>Vuex</h2>
    <form @submit.prevent="agregarTarea(tarea)">
      <input type="text" class="form-control mb-2" v-model="tarea">
      <b-button type="submit">Agregar</b-button>
    </form>
    <ul>
      <li v-for="(item, index) in tareas" :key="index">
        {{item.id}} - 
        {{item.nombre}}
        <b-button class="btn-sm btn-warning">Editar</b-button>
        <b-button class="btn-sm btn-danger" @click="eliminarTarea(item)">Borrar</b-button>
        <hr>
      </li>
    </ul>
  </div>
</template>

<script>
import { db } from '@/plugins/firebase'
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState(['tareas'])    
  },

  methods: {
    ...mapActions(['agregarTarea', 'eliminarTarea']),

    name() {
      
    }
  },

  data() {
    return {
      tarea: ''
    }
  },
}
</script>