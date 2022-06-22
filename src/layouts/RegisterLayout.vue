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
      <h4> - Register - </h4>
      <q-form
        @submit="registerUser"
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
          class="firstNameInput"
          v-model="firstName"
          outlined
          type="text"
          label="Enter your first name"
          hint="Your first name"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']" />

        <q-input
          class="lastNameInput"
          v-model="lastName"
          outlined
          type="text"
          label="Enter your last name"
          hint="Your last name"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']" />

        <q-input
          class="passwordInput"
          v-model="password"
          outlined
          :type="isPwd ? 'password' : 'text'"
          :rules="[
            val => val && val.length > 0 || 'Please type something',
            val => val && val.length > 8 || 'Password has to be at least 8 characters long'
          ]"
          hint="Password">brokrbackend.wiredless.io
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>

      <q-input
          class="passwordInput"
          v-model="rptPassword"
          outlined
          :type="isPwd ? 'password' : 'text'"
          hint="Repeat password">
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>

        <div>
          <q-btn class="submitButton" label="Register" type="submit" color="primary"/>
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
      firstName:"",
      lastName:"",
      password:"",
      rptPassword:"",
      isPwd:true
    }
  },
  methods: {
    onReset(){

    },
    validateUserInput(){
      //chech password
      if(this.rptPassword == this.password){
        return true;
      }
      else return false;
    },
    registerUser(){
      let validationOK = this.validateUserInput();

      if(validationOK){
        fetch("https://brokrbackend.wiredless.io/users/register",
          {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method:"POST",
            body: JSON.stringify(
              {
                email:this.email,
                firstName:this.firstName,
                lastName:this.lastName,
                password:this.password,
              }
            )
          }
        )
        .then(res => res.text())
        .then(data => {
          const resState = JSON.parse(data);
          if(resState.success){
            console.log("Success")
            // route back to login
            // tell login page that user was added and should show notification
            this.$router.push(
              {
                path:"/login",
                query:{
                  registeredUser:true,
                  msg:"New User has been registered. Please log in."
                }
              }
            )
          }
          //console.log(resState);
          //this.$router.push('/')
        })
        .catch(error => {
          console.error(error);
          //this.$router.push('/')
        })

      }
    }
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
  z-index: 5;
  position: fixed;
  top:20px;
  left:20px;
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
