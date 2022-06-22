<template>
  <q-page>
    <section class="recentProjectsSection">
      <h4>My Projects</h4>
      <div class="projectsContainer fit row wrap justify-start items-start content-start">
        <projectcard
          v-for="item,index in services"
          :key="index"
          :service="item"
          :onRemove="removeService"
          >
        </projectcard>
      </div>
    </section>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-fab color="primary" icon="add" direction="up">
        <q-fab-action external-label label="New Service" label-position="left" color="primary" icon="img:images/serverRack.png" @click="createNewService" />
        <q-fab-action external-label label="New Document" label-position="left" color="primary" icon="img:images/docSheet.png" @click="createNewDocument" />
      </q-fab>
    </q-page-sticky>
  </q-page>
</template>

<script>
import ProjectCard from 'src/components/ProjectCard.vue';
import { Cookies } from 'quasar';

export default {
  name: 'IndexPage',
  components:{
    "projectcard":ProjectCard,
  },
  data(){
    return {
      services:[]
    }
  },
  beforeMount(){
    this.fetchServices();
  },
  methods:{
    fetchServices(){
      let accessToken = Cookies.get("accessToken")

      if(accessToken){
        fetch("https://brokrbackend.wiredless.io/services",{
          headers:{
            'Authorization':'bearer ' + accessToken
          }
        })
        .then(res => res.text())
        .then(data => {
          this.services = JSON.parse(data);
        })
      }
    },
    createNewService(){
      this.$router.push("/createService")
    },
    removeService(id){
      let accessToken = Cookies.get("accessToken")

      fetch("https://brokrbackend.wiredless.io/services/deleteService?id=" + id,{
          headers:{
            'Authorization':'bearer ' + accessToken
          }
        })
        .then(data => {
          this.fetchServices();
        })

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
