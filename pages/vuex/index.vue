<template>
  <div>
    <h2>Vuex</h2>
  </div>
</template>

<script>
import { db } from '@/plugins/firebase'
export default {
  created(){
    db.collection('tareas').get()
      .then(query => {
        query.forEach(element => {
          console.log(element.data());
        })
      })
  }
}
</script>