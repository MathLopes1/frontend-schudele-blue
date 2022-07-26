<template>
  <div id="app">

    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">Agenda Blue</a>
      </div>
    </nav>

    <div class="container">

      <form @submit.prevent="save">

          <label>Nome</label>
          <input type="text" placeholder="Nome" v-model="personData.name">
          <label>Email</label>
          <input type="text" placeholder="Email" v-model="personData.emailAddress">
          <label>Telefone</label>
          <input type="text" placeholder="Telefone" v-model="personData.phoneNumber">

          <button class="waves-effect waves-light btn-small">Salvar<i class="material-icons left">save</i></button>

      </form>

      <table>

        <thead>

          <tr>
            <th>NOME</th>
            <th>EMAIL</th>
            <th>TELEFONE</th>
            <th>OPÇÕES</th>
          </tr>

        </thead>

        <tbody>

          <tr v-for="person of listPerson" :key="person.id">

            <td>{{ person.name }}</td>
            <td>{{ person.emailAddress }}</td>
            <td>{{ person.phoneNumber }}</td>
            <td>
              <button class="waves-effect btn-small blue darken-1"><i class="material-icons">create</i></button>
              <button class="waves-effect btn-small red darken-1"><i class="material-icons">delete_sweep</i></button>
            </td>

          </tr>

        </tbody>
      
      </table>

    </div>
  </div>
</template>

<script>

import ScheduleService from './services/schedule';

export default {
  data(){
    return {
      personData: {
        name: '',
        emailAddress: '',
        phoneNumber: ''
      },
      listPerson: []
    }
  },

  mounted(){
    this.listAll()
  },

  methods: {
    listAll(){
        ScheduleService.listAll().then(res => {
        this.listPerson = res.data;
      })
    },
    
    save() {
      ScheduleService.save(this.personData).then(res => {
        this.personData= {}
        this.listAll()
        console.log(res)
      })
    }
  }
}

</script>

<style>

</style>