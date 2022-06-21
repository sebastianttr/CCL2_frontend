<template>
  <q-dialog
      v-model="model"
      persistent
      transition-show="slide-up"
      transition-hide="slide-down">
      <q-card class="bg-white text-black q-pa-sm" style="width: 500px;border-radius:20px">
        <q-card-section>
          <div class="text-h6">{{title}}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            v-model="oldPasswordModel"
            outlined
            type="password"
            label="Enter current password"
            class="q-mb-lg"
            :rules="[
              val => val && val.length > 0 || 'Please type something',
            ]"
          />

          <p class="text-body1 q-mb-sm">
            New Password
          </p>

          <q-input
            v-model="newPasswordModel"
            outlined
            label="Enter new password"
            :type="isPwd ? 'password' : 'text'"
            :rules="[
              val => val && val.length > 0 || 'Please type something',
              val => val && val.length > 8 || 'Password has to be at least 8 characters long'
            ]"
            class="q-mb-md"
            hint="Password">
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <q-input
            v-model="confirmNewPasswordModel"
            outlined
            type="password"
            label="Confirm new password"
            class="q-mb-md"
            :rules="[
              val => val && val.length > 0 || 'Please type something'
            ]"/>

            <p v-if="error" class="text-center text-red">{{errorMsg}}</p>

        </q-card-section>

        <q-card-actions align="right" class="bg-white text-primary">
          <q-btn flat rounded label="Cancel" color="red" @click="onCancel" v-close-popup />
          <q-btn flat rounded :label="confirmText" :loading="showSpinner" @click="changePassword" />
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<script>
import { Cookies } from 'quasar';

export default {
  name:"ChangePasswordDialog",
  props:{
    model:{
      type:Boolean,
      required:true
    },
    title:{
      type:String,
      required: true
    },
    text:{
      type:String,
      required: true
    },
    confirmText:{
      type: String,
      required: true
    },
    onCancel:{
      type: Function,
    },
    onConfirm: {
      type: Function,
    }
  },
  data(){
    return {
      oldPasswordModel:"",
      newPasswordModel:"",
      confirmNewPasswordModel:"",
      error:false,
      errorMsg:"",
      isPwd:true,
      showSpinner:false
    }
  },
  methods:{
    changePassword(){

      if(this.newPasswordModel != this.confirmNewPasswordModel){
        this.error = true;
        this.errorMsg = "Please confirm with the correct password!";
      }
      else if(!this.oldPasswordModel){
        this.error = true;
        this.errorMsg = "Please enter your current password!";
      }
      else {
        this.showSpinner = true;

        fetch("http://localhost:3000/users/changePassword",{
          method:"POST",
          headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization':'bearer ' + this.accessToken
          },
          body:JSON.stringify({
            oldPassword:this.oldPasswordModel,
            newPassword:this.newPasswordModel,
          })
        })
        .then(res => {
          this.showSpinner = true;

          this.oldPasswordModel = "";
          this.newPasswordModel = "";
          this.confirmNewPasswordModel = "";

          this.error = false;
          this.errorMsg = "";

          this.onConfirm?.();
        })
        .catch(err => {
          this.error = true;
          this.errorMsg = "Old password incorrect!";
        })
      }

    }
  },
  computed:{
    accessToken(){
      return Cookies.get("accessToken")
    }
  },
}
</script>

<style>

</style>
