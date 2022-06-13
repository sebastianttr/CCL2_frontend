<template>
  <div class="projectCard">
    <div class="projectTopBar full-width row wrap justify-between items-center content-start">
      <h5>My Project</h5>
      <div class="activityPoint"></div>
    </div>
    <div class="projectCardContent">
      <q-btn
        class="editButton"
        outline
        color="green"
        label="Edit"
        v-on:click="$router.push('editor/ide')"
      />
    </div>

  </div>
</template>

<script>
export default {
  name:"ProjectCard",
  date(){
    return {

    }
  },
  methods:{

  },
  beforeMount() {

  }
}
</script>

<style>

.projectCard{
  position: relative;
  width: 360px;
  height: 240px;
  box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, .2);
  border-radius: 20px;
  overflow: hidden;
}

.projectTopBar{
  position: absolute;
  z-index: 3;
  padding: 15px;
  background: #F5F5F5;
  border-bottom: 2px solid #DBDBDB;
}

.projectTopBar h5{
  font-weight: 500;
}

.activityPoint{
  width: 15px;
  height: 15px;
  margin-right: 5px;
  background-color: rgb(29,175,79);
  border-radius: 10px;
}

.projectCardContent{
  position: relative;
  width: 100%;
  height: 100%;
}

.editButton{
  position: absolute;
  bottom: 10px;
  right: 10px;
}

</style>
