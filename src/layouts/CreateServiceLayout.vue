<template>
  <q-layout class="appearLayout" view="hHh lpR fFf">
    <q-header class="bg-white text-white" height-hint="98">
      <q-toolbar>
        <q-btn class="backButton" rounded color="black" icon="arrow_back" label="Back to home" v-on:click="$router.push('/')" />
      </q-toolbar>
     </q-header>

    <q-page-container>
      <q-page class="page" padding>
        <q-form
          @submit="onSubmit"
          class="q-gutter-md form q-mt-xl text-center"
        >
          <q-img
            src="images/serverRack.png"
            spinner-color="primary"
            spinner-size="82px"
            width="100px"
          />
          <h3 class="title">Create new service</h3>
          <q-input
            class="inputField q-mt-lg "
            v-model="name"
            outlined
            type="text"
            label="Service name"
            hint="Enter your service name"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Name cannot be empty']" />

            <q-input
            class="inputField  q-mt-lg"
            v-model="description"
            outlined
            type="text"
            label="Description"
            hint="Enter a description"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Descrption cannot be empty']" />

            <p class="descLabel">Node version</p>
            <q-select
              class="dropdownSelect"
              outlined
              v-model="nodeVersion"
              :options="nodeVerionsAvailable"
              label="Select version" />

            <q-btn class="submitButton" rounded label="Create" type="submit" color="primary"/>
        </q-form>
      </q-page>
    </q-page-container>

  </q-layout>
</template>

<script>
import { Cookies } from 'quasar';

export default {
  name:"CreateServiceLayout",
  data(){
    return {
      name:"",
      description:"",
      nodeVersion:"16.14.2",
      nodeVerionsAvailable:[
        "16.14.2"
      ]
    }
  },
  methods:{
    onSubmit(){
      let accessToken = Cookies.get("accessToken")
      if(accessToken){
        //get user
        fetch("https://brokrbackend.wiredless.io/services/create",{
          method:"POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization':'bearer ' + accessToken
          },
          body:JSON.stringify({
            serviceName:this.name,
            description:this.description,
            nodeVersion:this.nodeVersion
          })
        })
        .then(res => res.text())
        .then(data => {
          this.$router.push({path:"/ide"})
          //const resData = JSON.parse(data);
          //this.userName = resData.firstName + " " + resData.lastName;
        })
      }
      else {
        // go to login page
        this.$router.push("/login")
      }
    }
  }
}
</script>

<style>

.appearLayout{
  opacity: 1;
  animation: fadeInAnimation 0.5s ease-in-out;
  overflow: hidden;

}

@keyframes fadeInAnimation {
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
}

@keyframes slideInAnimation {
  0%{
    margin-left: 100px;
  }
  100%{
    margin-left: 0px;
  }
}

.descLabel{
  align-self: flex-start;
  font-size: 18px;
  margin-top: 10px;
}

.form{
  width:400px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.page{
  width: 100vw;
  height: 100vh;
  margin-top:-100px;
  animation: slideInAnimation 0.5s ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: white;
}

.title{
  font-weight: 300;
  padding-top: 30px;
}

.inputField{
  width:400px;
}

.dropdownSelect{
  padding-left: 10px;
  padding-right: 10px;
  width:100%;
}

.submitButton{
  width:400px;
}

</style>
