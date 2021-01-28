<template>
  <div class="container mb-5">
    <h2>Editar Tarea</h2>
    {{tarea}}
    <form @submit.prevent="editarTarea(tarea)">
      <input type="text" class="form-control mb-2" v-model="tarea.nombre">
      <b-button type="submit" class="btn btn-warning">Editar</b-button>
    </form>
  </div>
</template>
<script>
import {mapState, mapActions} from 'vuex'
import { db } from '@/plugins/firebase'
export default {
  fetch({store, params}){
    return db.collection('tareas').doc(params.id).get()
      .then(doc => {
        if (doc.exists) {
          let tarea = doc.data()
          tarea.id = doc.id
          return store.commit('SET_ONE_TASK', tarea)
        }
      })
      .catch(error => {
        console.log(error);
      })
  },

  computed: {
    tarea: {
      get(){
        return{
          nombre: this.$store.state.tarea.nombre,
          id: this.$store.state.tarea.id
        }
      }
    }
  },

  methods: {
    ...mapActions(['editarTarea'])
  },
}
</script>