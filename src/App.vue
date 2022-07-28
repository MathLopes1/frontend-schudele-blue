<template>
  <div id="app">

    <nav>
      <div class="nav-wrapper green darken-2">
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
          <input type="text" placeholder="Skywalker" v-model="personData.name">
          <label>Email</label>
          <input type="text" placeholder="padwan@gmail.com" v-model="personData.emailAddress">
          <label>Telefone</label>
          <input type="text" placeholder="(81) 98866-3355" v-maska="'(##) #####-####'" v-model="personData.phoneNumber">

          <button class="waves-effect waves-light btn-small green">Salvar<i class="material-icons left">save</i></button>

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
              <button @click="update(person)" class="waves-effect btn-small green darken-1"><i class="material-icons">create</i></button>
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
import { maska } from 'maska';

export default {
  directives: { maska },
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