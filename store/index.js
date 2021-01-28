import { db } from '@/plugins/firebase.js'
import { Date } from 'core-js'

export const state = () => ({
  tareas: '',
  tarea: ''
})

export const mutations = {
  SET_TAREAS(state, payload){
    state.tareas = payload
  },

  SET_TAREA(state, payload){
    state.tareas.push(payload)
  },

  DELETE_TAREA(state, payload){
    const index = state.tareas.findIndex(item => item.id === payload.id)
    state.tareas.splice(index, 1)
  },

  UPDATE_TAREA(state, payload){
    const index = state.tareas.findIndex(item => item.id === payload.id)
    state.tareas[index].nombre = payload.nombre
  },

  SET_ONE_TASK(state, payload){
    state.tarea = payload
  }
}

export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    return db.collection('tareas').get()
      .then(query => {
        const tareas = []

        query.forEach(element => {
          let tarea = element.data()
          tarea.id = element.id
          tareas.push(tarea)
        })

        return commit('SET_TAREAS', tareas)
      })
      .catch(error => {
        console.log("Error getting documents", error)
      })
  },

  async agregarTarea({commit}, payload){
    try {
      const doc = await db.collection('tareas').add({
        nombre: payload,
        fecha: new Date()
      })

      commit('SET_TAREA', { nombre: payload, id: doc.id })
    } catch (error) {
      console.log(error);
    }
  },

  eliminarTarea({commit}, payload){
    db.collection("tareas").doc(payload.id).delete().then(function() {
      console.log("Document successfully deleted!");
      commit('DELETE_TAREA', payload)
    }).catch(function(error) {
      console.error("Error removing document: ", error);
    });
  },

  editarTarea({commit}, payload){
    db.collection('tareas').doc(payload.id).update({
      nombre: payload.nombre
    })
    .then(() => {
      console.log('Tarea editada')
      commit('UPDATE_TAREA', payload)
      this.app.router.push('/vuex')
    })
    .catch(error => {
      console.log(error);
    })
  }

}