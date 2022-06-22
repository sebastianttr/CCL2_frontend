<template>
  <div class="projectCard">
    <div class="projectTopBar full-width row wrap justify-between items-center content-start">
      <div>
        <h5>{{service.serviceName}}</h5>
        <p>https://brokrbackend.wiredless.io/service/{{service.ID}}/</p>
      </div>

      <div>
        <q-btn icon="more_vert" flat round @click="onClick">
          <q-menu>
          <q-list style="min-width: 100px">
            <q-item clickable v-close-popup v-on:click="showDialog">
              <q-item-section>Remove</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
        </q-btn>
      </div>
    </div>
    <div class="projectCardContent">
      <!--
      <q-btn
        class="editButton"
        outline
        color="green"
        label="Edit"
        v-on:click="navigateToIDEPage()"
      />
      -->
      <div class="projectCardItem">
        <div class="projectCardImg" v-on:click="navigateToIDEPage()">
          <q-img
            src="images/codeIcon.png"
            spinner-color="primary"
            width="70px"
          />
          <div>
            <p class="projectCardText">Edit your code</p>
            <p>Press to edit the code in the code editor</p>
          </div>
        </div>
      </div>
      <div class="projectCardItem">
        <div class="projectCardImg" v-on:click="navigateToTestPage()">
          <q-img
            src="images/testTube.png"
            spinner-color="primary"
            width="50px"
          />
          <div>
            <p class="projectCardText">Test your service</p>
            <p>Press to edit the code in the code editor</p>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

export default {
  name:"ProjectCard",
  props:{
    service:{
      default:{},
      required:true,
    },
    onRemove:{
      type:Function,
      required:true
    }
  },
  data(){
    return {
      removeServiceModel:false
    }
  },
  methods:{
    navigateToIDEPage(){
      this.$router.push(
        {
          name:'ide',
          params:{service:JSON.stringify(this.service)
        }
      })
    },
    navigateToTestPage(){
      window.location.href = "https://brokrbackend.wiredless.io/service/" + this.service.ID
    },
    showDialog(){
      this.onRemove(this.service.ID)
    },
    removeService(){
      console.log("Hello World!")
    }
  },
  beforeMount() {

  }
}
</script>

<style>

.projectCard{
  width: 100%;
  /* box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, .2); */
  overflow: hidden;
  border: 1.5px solid #DBDBDB;
}

.projectTopBar{
  z-index: 3;
  padding: 15px;
  border-bottom: 1.5px solid #DBDBDB;
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
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap:16px;
  padding:10px;
}

.projectCardItem{
  width: calc((100% - 16px) / 2);
  min-width: 200px;
  height: 100px;
  background-color: rgb(250, 250, 250);
  border: 2px solid #DBDBDB;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  align-content: center;
  transition:
    background-color 0.2s ease-in-out,
    margin-top 0.2s ease-in-out;
}

@media only screen and (max-width: 768px) {
  .projectCardContent{
    flex-direction: column;
  }

  .projectCardItem{
    width: 100%;
  }
}

.projectCardImg{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
}

.projectCardText{
  font-size: 20px;
  font-weight: 600;
}

.projectCardItem:hover{
  background-color: #1daf50;
  margin-top: -5px;
}


</style>
