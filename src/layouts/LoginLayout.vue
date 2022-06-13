<template>
  <div class="loginLayout">
    <div class="waves">
      <q-img
        class="wavesTop"
        src="images/wavesTop.png"
        spinner-color="primary"
        spinner-size="82px"
      />

      <q-img
        class="wavesBottom"
        src="images/wavesBottom.png"
        spinner-color="primary"
        spinner-size="82px"
      />
    </div>

    <q-btn class="backButton" rounded color="black" icon="arrow_back" label="Back to home" v-on:click="$router.push('/')" />

    <div class="loginForm">
      <h2>Brokr</h2>
      <h4> - Login - </h4>
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md q-mt-xl text-center"
      >
        <q-input
          class="emailInput"
          v-model="email"
          outlined
          type="text"
          label="Enter your email here"
          hint="Your Email"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']" />

        <q-input
          class="passwordInput"
          v-model="password"
          outlined
          :type="isPwd ? 'password' : 'text'"
          hint="Password">
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>

        <div>
          <q-btn class="submitButton" label="Login" type="submit" color="primary"/>
        </div>

        <div class="center">
          No Brokr account? <a href="/#/register">Create a new account.</a>
        </div>

      </q-form>
    </div>
  </div>
</template>

<script>
export default {
  name:"LoginLayout",
  data(){
    return {
      email:"",
      password:"",
      isPwd:true
    }
  },
  methods:{

  },
  created(){
  }
}
</script>

<style>

.loginLayout{
  position:relative;
}

.waves{
  position:absolute;
  height: 100vh;
  width: 100vw;
}

.wavesTop{
  position: absolute;
  width: 45%;
  animation: appearIn 2s cubic-bezier(0,1.18,.97,.9);
}

.wavesBottom{
  position: absolute;
  width: 45%;
  right:0;
  bottom: 0;
  animation: appearIn 2s cubic-bezier(0,1.18,.97,.9);
}

.backButton{
  position: fixed;
  top:20px;
  left:20px;
  z-index: 4;
}

@keyframes appearIn {
  0% {
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
}

.loginForm{
  position: absolute;
  z-index: 3;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column nowrap;
}

.emailInput{
  width: 400px;
}
.passwordInput{
  width: 400px;
}

.submitButton{
  width: 400px;
}

</style>
