<template>
  <q-page>
    <section class="recentProjectsSection">
      <h3>Recent Projects</h3>
      <div class="projectsContainer fit row wrap justify-start items-start content-start">
        <projectcard></projectcard>
        <projectcard></projectcard>
      </div>
    </section>

    <section class="exploreProjectsSection">
      <h3>Explore Projects</h3>
      <div class="projectsContainer fit row wrap justify-start items-start content-start">
        <projectcard></projectcard>
        <projectcard></projectcard>
      </div>
    </section>

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

    }
  },
  methods:{
    createNewService(){
      this.$router.push("/createService")
    },
    createNewDocument(){

    }
  },
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
