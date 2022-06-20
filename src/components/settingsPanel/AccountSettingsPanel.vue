<template>
     <h5 class="q-mb-lg"><b>Account Settings</b></h5>
      <p>First name</p>
      <editablefield label="First name" :model="userData.firstName"></editablefield>
      <p>Last name</p>
      <editablefield label="Last name" :model="userData.lastName"></editablefield>

      <h5 class="q-mb-sm q-mt-lg"><b>Danger Zone</b></h5>
      <div class="full-width row wrap justify-start items-start content-start">
        <q-btn flat rounded color="primary" label="Change Password" />
        <q-btn flat rounded color="red" label="Delete Account" />
      </div>
</template>

<script>
import EditableField from '../EditableField.vue'

export default {
  name:"AccountSettingsPanel",
  components:{
    "editablefield":EditableField
  },
  props:{
    userData:{
      type:Object,
      required:true
    }
  },
  data(){
    return {

    }
  }

}
</script>

<style>

</style>
