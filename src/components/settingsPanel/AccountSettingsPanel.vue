<template>
     <h5 class="q-mb-lg"><b>Account Settings</b></h5>
      <p>First name</p>
      <editablefield
        label="First name"
        :model="userData.firstName"
        :onChange="changeFirstName">
      </editablefield>
      <p>Last name</p>
      <editablefield
        label="Last name"
        :model="userData.lastName"
        :onChange="changeLastName">
      </editablefield>

      <h5 class="q-mb-sm q-mt-lg"><b>Danger Zone</b></h5>
      <div class="full-width row wrap justify-start items-start content-start">
        <q-btn flat rounded color="primary" label="Change Password" @click="changePasswordDialog=true" />
        <q-btn flat rounded color="red" label="Delete Account" @click="deleteAccountDialog=true" />
      </div>

      <changepassworddialog
        :model="changePasswordDialog"
        title="Change password"
        text=""
        confirm-text="Change"
        :onCancel="() => {changePasswordDialog=false}"
        :onConfirm="() => {changePasswordDialog=false}"
        >

      </changepassworddialog>

      <confirmationdialog
        :model="deleteAccountDialog"
        title="Are you sure?"
        text="Are you sure you want to delete your account? This means that you will also delete all the projects and documents!"
        confirmText="Yes, go ahead"
        :onCancel="() => {
          deleteAccountDialog = false
        }"
        :onConfirm="deleteAccount">
      </confirmationdialog>

</template>

<script>
import EditableField from '../EditableField.vue'
import { Cookies } from 'quasar';
import ChangePasswordDialog from '../dialogs/ChangePasswordDialog.vue';
import ConfirmationDialog from '../dialogs/ConfirmationDialog.vue';

export default {
  name:"AccountSettingsPanel",
  components:{
    "editablefield":EditableField,
    "changepassworddialog":ChangePasswordDialog,
    "confirmationdialog":ConfirmationDialog
  },
  props:{
    userData:{
      type:Object,
      required:true
    }
  },
  data(){
    return {
      changePasswordDialog:false,
      deleteAccountDialog:false
    }
  },
  methods:{
    send(firstName,lastName,id){
      fetch("http://localhost:3000/users/changeNames",{
        method:"POST",
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization':'bearer ' + this.accessToken
        },
        body:JSON.stringify({
          firstName:firstName,
          lastName:lastName,
          id:id
        })
      })
      .then(res => {
        console.log("Set successfully!")
      })
      .catch(err => {
        console.error("Error!")
      })
    },
    changeFirstName(firstName){
      this.send(
        firstName,
        this.userData.lastName,
        this.userData.ID
      )
    },
    changeLastName(lastName){
      this.send(
        this.userData.firstName,
        lastName,
        this.userData.ID
      )
    },
    deleteAccount(){
      // delete your account here!
      this.deleteAccountDialog = false;
      console.log("deleteing account!")
      fetch("https://brokrbackend.wiredless.io/users/deleteUser",{
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization':'bearer ' + this.accessToken
        },
      })
      .then(res => {
        Cookies.remove("accessToken")
        this.$router.push("/login")
      })
      .catch(err => {
        console.error("Error!")
      })
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
