<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-white">
        <q-btn flat round color="primary" aria-label="Menu" @click="toggleLeftDrawer">
          <q-img
            src="images/drawerbutton.png"
            :ratio="16 / 9"
            spinner-color="primary"
            spinner-size="82px"
            width="32px"
          />
        </q-btn>

        <q-toolbar-title class="toobarTitle"> Brokr Home </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
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
              <p id="userName">{{userName}}</p>
              <q-btn outline color="black" size="1em" padding="0px" class="q-mt-sm">
                <p class="q-ml-sm q-mr-sm">Manage Account</p>
              </q-btn>
            </div>
            <q-btn flat round color="primary" aria-label="Menu">
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
          <DrawerLinks v-for="link in essentialLinks" :key="link.title" v-bind="link" />
        </div>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import DrawerLinks from "src/components/DrawerLinks.vue";
import { Cookies } from 'quasar';


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
  name: "MainLayout",

  components: {
    DrawerLinks,
  },
  data(){
    return {
      userName:"Not logged in!"
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
      fetch("http://localhost:3000/users/getUser",{
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authentication':'bearer ' + accessToken
        },
      })
      .then(res => res.text())
      .then(data => {
        const resData = JSON.parse(data);
        this.userName = resData.firstName + " " + resData.lastName;
      })
    }
    else {
      // go to login page
      this.$router.push("/login")
    }
  },
  setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
<style>
p {
  margin: 0;
}

.drawer {
  background: #1daf4f;
  background: linear-gradient(
    180deg,
    rgba(29, 175, 79, 1) 0%,
    rgba(184, 252, 187, 1) 140%
  );
  border-radius: 0px 30px 30px 0px;
}

.toobarTitle {
  color: black;
}

.userSection {
  padding: 35px;
}

.userSection #userName {
  word-break: break-all;
  font-size: 30px;
}

.userSection #userIcon {
  margin-bottom: 20px;
}

.links {
  margin: 35px;
}
</style>
