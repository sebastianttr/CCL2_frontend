<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-white">

        <q-btn
          flat round
          color="primary"
          aria-label="Menu"
          @click="toggleLeftDrawer">
          <q-img
            src="images/drawerbutton.png"
            spinner-color="primary"
            spinner-size="82px"
            width="32px"
          />
        </q-btn>

        <q-toolbar-title class="toobarTitle">
          Editor Layout
        </q-toolbar-title>

        <q-btn
          v-for="(item,index) in toolbarActions"
          :key="index"
          flat round
          color="primary"
          class="q-mr-sm  "
          @click="item.action">
          <q-img
            :src="(item.alternateIcon && state == 'running')?item.alternateIcon:item.icon"
            style="transform: scale(0.6);"
          />
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      :breakpoint="1920"
      class="drawer"
      :elevated="false"
      :bordered="false"
    >
      <q-list>
        <section class="userSection">
          <q-img
            src="images/userIcon.png"
            spinner-color="primary"
            spinner-size="82px"
            width="60px"
            id="userIcon"
          />
          <div class="full-width row wrap justify-between items-start">
            <div>
              <p id="title">{{userName}}</p>
              <q-btn
                outline
                color="black"
                size="1em"
                padding="0px"
                class="q-mt-sm"
                @click="this.$router.push({name:'settings',params:{user:this.userData}})">
                <p class="q-ml-sm q-mr-sm">Manage Account</p>
              </q-btn>
            </div>
            <q-btn
              flat round
              color="primary"
              aria-label="Menu">
              <q-img
                src="images/exit.png"
                spinner-color="primary"
                spinner-size="82px"
                width="28px"
                v-on:click="logout()"
              />
            </q-btn>
          </div>
        </section>

        <div class="links">
          <DrawerLinks
            v-for="link in linksList"
            :key="link.title"
            v-bind="link"
            @click="link.onClick"
          />
        </div>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import DrawerLinks from 'src/components/DrawerLinks.vue'
import emitter from 'tiny-emitter/instance'
import { Cookies } from 'quasar';


export default defineComponent({
  name: 'MainLayout',

  components: {
    DrawerLinks
  },
  data(){
    return {
      state: "stopped",
      userData:null,
      userName:"Not logged in!",
      toolbarActions:[
        {
          icon:"images/playButton.png",
          alternateIcon:"images/repeatButton.png",
          action: () => {
            emitter.emit('runService')
            this.state = "running";
          }
        },
        {
          icon:"images/haltButton.png",
          action: () => {
            emitter.emit('stopService')
            this.state = "stop";
          }
        },
        {
          icon:"images/terminalButton.png",
          action: () => {
            // something idk
            emitter.emit('terminal')
          }
        },
      ],
      linksList:[
        {
          title: "Home",
          icon: "images/homeIcon.png",
          link: "https://quasar.dev",
          onClick: () => {
            this.$router.push("/");
          }
        },
        {
          title: "Services",
          icon: "images/serverRack.png",
          link: "https://github.com/quasarframework",
          onClick: () => {
            this.$router.push("/");
          }
        },
        {
          title: "Docs",
          icon: "images/docSheet.png",
          link: "https://chat.quasar.dev",
          onClick: () => {
            this.$router.push("/");
          }
        },
        {
          title: "Settings",
          icon: "images/settingsIcon.png",
          link: "https://forum.quasar.dev",
          onClick: () => {
            this.$router.push({name:'settings',params:{user:this.userData}});
          }
        },
      ]
    }
  },
  methods:{
    logout(){
      Cookies.remove("accessToken")
      this.$router.push('/login')
    }
  },
  beforeMount(){
    let accessToken = Cookies.get("accessToken")
    if(accessToken){
      //get user
      fetch("https://brokrbackend.wiredless.io/users/getUser",{
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization':'bearer ' + accessToken
        },
      })
      .then(res => res.text())
      .then(data => {
        const resData = JSON.parse(data);
        this.userData = data;
        this.userName = resData.firstName + " " + resData.lastName;
      })
    }
    else {
      // go to login page
      this.$router.push("/login")
    }
  },
  setup () {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
<style>



p{
  margin: 0;
}

.drawer{
  background: #1daf4f;
  background: linear-gradient(180deg, rgba(29,175,79,1) 0%, rgba(184,252,187,1) 140%);
}

.toobarTitle{
  color:black
}

.userSection{
  padding:35px;
}

.userSection #title{
  font-size: 30px;
}

.userSection #userIcon{
  margin-bottom: 20px;
}

.links{
  margin:35px;
}

</style>
