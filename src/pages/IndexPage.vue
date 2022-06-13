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
  </q-page>
</template>

<script>
import ProjectCard from 'src/components/ProjectCard.vue'

export default {
  name: 'IndexPage',
  components:{"projectcard":ProjectCard}
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
