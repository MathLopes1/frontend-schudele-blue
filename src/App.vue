<template>
  <div id="app">

    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">Agenda Blue</a>
      </div>
    </nav>

    <div class="container">

      <ul>
        <li v-for="(erro, index) of errors" :key="index">
            campo <b>{{erro.field}}</b> - {{erro.defaultMessage}}
        </li>
      </ul>

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
              <button @click="update(person)" class="waves-effect btn-small blue darken-1"><i class="material-icons">create</i></button>
              <button @click="removing(person)" class="waves-effect btn-small red darken-1"><i class="material-icons">delete_sweep</i></button>
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
      listPerson: [],
      errors: []
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
    
    save(){
      if(!this.personData.id){
        ScheduleService.save(this.personData).then(() => {
          this.personData = {}
          alert('Cadastrado com sucesso!')
          this.listAll()
          this.errors = {}
        }).catch(e => {
          this.errors = e.response.data.errors
        })
      }else{
        ScheduleService.update(this.personData).then(res => {
          this.personData = {}
          this.errors = {}
          alert('Atualizado com sucesso!')
          this.listAll()
          console.log(res)
        }).catch(e => {
          this.errors = e.response.data.errors
        })
      }
      
    },

    update(data) {
      console.log(data)
      this.personData = data;
    },

    removing(person){
      if(confirm('Deseja excluir o usuário?')){
        ScheduleService.delete(person).then(resposta => {
          this.listAll()
          this.errors = {}
          console.log(resposta)
        }).catch(e => {
          this.errors = e.response.data.errors
        })
      }
    }
  }
}

</script>

<style>

</style>