<template>
  <q-page>
    <section class="recentProjectsSection">
      <h3>Recent Projects</h3>
      <div class="projectsContainer fit row wrap justify-start items-start content-start">
        <projectcard
          v-for="item,index in services"
          :key="index"
          :service="item"
          >
        </projectcard>
      </div>
    </section>

    <!--
    <section class="exploreProjectsSection">
      <h3>Explore Projects</h3>
      <div class="projectsContainer fit row wrap justify-start items-start content-start">
        <projectcard></projectcard>
        <projectcard></projectcard>
      </div>
    </section>
    -->

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-fab color="primary" icon="add" direction="up">
        <q-fab-action external-label label="New Service" label-position="left" color="primary" @click="createNewService" icon="mail" />
        <q-fab-action external-label label="New Document" label-position="left" color="secondary" @click="createNewDocument" icon="alarm" />
      </q-fab>
    </q-page-sticky>
  </q-page>
</template>

<script>
import ProjectCard from 'src/components/ProjectCard.vue';
import { Cookies } from 'quasar';

export default {
  name: 'IndexPage',
  components:{"projectcard":ProjectCard},
  data(){
    return {
      services:[]
    }
  },
  beforeMount(){
    console.log(this.getServices)
  },
  beforeMount(){
    let accessToken = Cookies.get("accessToken")

    if(accessToken){
      fetch("http://localhost:3000/services",{
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization':'bearer ' + accessToken
        }
      })
      .then(res => res.text())
      .then(data => {
        //console.log("Serivices from the user"+ data);
        this.services = JSON.parse(data);
      })
    }

    //nothing else if there is no access token

  },
  methods:{
    createNewService(){
      this.$router.push("/createService")
    },
    createNewDocument(){

    }
  },
  computed:{
  }
}
</script>

<style>

.recentProjectsSection{
  padding: 30px;
}

.exploreProjectsSection{
  padding: 30px;
}

.projectsContainer{
  margin-top: 20px;
  gap:15px
}

</style>
