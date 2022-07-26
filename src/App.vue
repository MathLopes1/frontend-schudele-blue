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
          <input type="text" placeholder="Nome" v-model="person.name">
          <label>Email</label>
          <input type="text" placeholder="Email" v-model="person.emailAddress">
          <label>Telefone</label>
          <input type="text" placeholder="Telefone" v-model="person.phoneNumber">

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
      person: {
        name: '',
        emailAddress: '',
        phoneNumber: ''
      },
      listPerson: []
    }
  },

  mounted(){
    ScheduleService.listAll().then(res => {
      console.log(res)
      this.listPerson = res.data;
    })
  },

  methods: {
    save() {
      ScheduleService.save(this.person).then(res => {
        alert('Salvo com sucesso')
        console.log(res)
      })
    }
  }
}

</script>

<style>

</style>