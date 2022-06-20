<template>
  <q-layout class="appearLayout" view="hHh lpR fFf">
    <q-header class="bg-white text-white" height-hint="98">
      <q-toolbar>
        <q-btn class="backButton" rounded color="black" icon="arrow_back" label="Back to home" v-on:click="$router.push('/')" />
      </q-toolbar>
     </q-header>

    <q-page-container>
      <q-page class="page">
          <h3 class="title q-mb-xl">Settings</h3>
          <div class="settingsLayout">
            <div class="panelSide">
              <p
              v-for="(link,index) in panelLinks"
              class="hoverPanelLink"
              :key="index"
              v-on:click="slide = link.index"
              :style="{
                fontWeight:(slide == link.index)?600:400,
                fontSize:'25px',
                padding:'5px',
                marginLeft:'10px',
                cursor:'pointer',
              }">
                {{link.name}}
              </p>
            </div>
            <div class="panelCenter">
              <q-carousel
                animated
                v-model="slide"
                transition-prev="slide-down"
                transition-next="slide-up"
                @mouseenter="autoplay = false"
                @mouseleave="autoplay = false"
              >
                <q-carousel-slide :name="1">
                    <accountsettingspanel
                      :userData="userData">
                    </accountsettingspanel>
                </q-carousel-slide>

                <q-carousel-slide :name="2">
                    <editorsettingspanel></editorsettingspanel>
                </q-carousel-slide>

                <q-carousel-slide :name="3">
                    <h5 class="q-mb-lg"><b>Documents Settings</b></h5>
                    <p>No settings at the moment.</p>

                </q-carousel-slide>
              </q-carousel>
            </div>
            <div class="panelSide">

            </div>
          </div>
      </q-page>
    </q-page-container>

  </q-layout>
</template>

<script>
import AccountSettingsPanel from 'src/components/settingsPanel/AccountSettingsPanel.vue';
import EditorSettingsPanel from 'src/components/settingsPanel/EditorSettingsPanel.vue';

export default {
  name:"SettingsLayout",
  components:{
    "accountsettingspanel":AccountSettingsPanel,
    "editorsettingspanel":EditorSettingsPanel
  },
  data(){
    return {
      panelLinks:[
        {
          name:"Account",
          index:1
        },
        {
          name:"IDE",
          index:2
        },
        {
          name:"Docs",
          index:3
        }
      ],
      slide: 1,
      autoplay: false,
      userData:null,

    }
  },
  methods:{

  },
  beforeMount(){
    let routeUserParam = this.$route.params;

    if(routeUserParam.user){
      this.userData = JSON.parse(routeUserParam.user);
    }
    else this.$router.push("login")

  },
  watch:{

  }
}
</script>

<style>

.appearLayout{
  opacity: 1;
  animation:
    fadeInAnimation 0.8s cubic-bezier(.09,.91,.12,.98);
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
    margin-top: 100px;
  }
  100%{
    margin-top: -100px;
  }
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
  margin-top: -100px;
  animation:
    slideInAnimation 0.8s cubic-bezier(0,1.04,.87,.98),
    fadeInAnimation 0.8s cubic-bezier(0,1.04,.87,.98);
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

.settingsLayout{
  display: flex;
  justify-content: center;
  align-items: center;
}

.panelSide{
  width:250px;
  height: 500px;
}

.panelCenter{
  width:600px;
  height: 500px;
}

.hoverPanelLink{
  background-color:transparent;
  transition: background-color 0.1s ease-in-out;
  border-radius: 10px;
}

.hoverPanelLink:hover{
  background-color:rgb(233, 233, 233);
  transition: background-color 0.2s ease-in-out;
}


</style>
