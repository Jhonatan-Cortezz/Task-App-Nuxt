import { db } from '@/plugins/firebase.js'
import { Date } from 'core-js'

export const state = () => ({
  tareas: ''
})

export const mutations = {
  SET_TAREAS(state, payload){
    state.tareas = payload
  },

  SET_TAREA(state, payload){
    state.tareas.push(payload)
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
  }
}