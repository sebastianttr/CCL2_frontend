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
            :ratio="16/9"
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
            :src="item.icon"
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
              <p id="title">John Doe</p>
              <q-btn
                outline
                color="black"
                size="1em"
                padding="0px"
                class="q-mt-sm">
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
                v-on:click="$router.push('/login')"
              />
            </q-btn>
          </div>
        </section>

        <div class="links">
          <DrawerLinks
            v-for="link in essentialLinks"
            :key="link.title"
            v-bind="link"
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


const linksList = [
  {
    title: "Home",
    icon: "images/homeIcon.png",
    link: "https://quasar.dev",
  },
  {
    title: "Services",
    icon: "images/serverRack.png",
    link: "https://github.com/quasarframework",
  },
  {
    title: "Docs",
    icon: "images/docSheet.png",
    link: "https://chat.quasar.dev",
  },
  {
    title: "Settings",
    icon: "images/settingsIcon.png",
    link: "https://forum.quasar.dev",
  },
];


export default defineComponent({
  name: 'MainLayout',

  components: {
    DrawerLinks
  },
  data(){
    return {
      toolbarActions:[
        {
          icon:"images/playButton.png",
          action: () => {
            emitter.emit('runService')
          }
        },
        {
          icon:"images/repeatButton.png",
          action: () => {
            // we will remove it.
            emitter.emit('reRunService')
          }
        },
        {
          icon:"images/haltButton.png",
          action: () => {
            emitter.emit('stopService')
          }
        },
        {
          icon:"images/terminalButton.png",
          action: () => {
            // something idk
          }
        },
      ]
    }
  },
  setup () {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
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
  border-radius: 0px 30px 30px 0px;
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
