<template>
  <div class="settingDropdow">
    <p class="description">{{description}}</p>
    <q-toggle v-model="model" color="primary" />
  </div>
</template>

<script>
export default {
  name:"SettingsToggle",
  props:{
    description:{
      type:String
    },
    model:{
      type:Boolean
    },
    onChange:{
      type:Function
    }
  },
  data(){
    return {

    }
  },
  watch:{
    model(newValue,oldValue){
      console.log(newValue);
      this.onChange?.(newValue);
    }
  }
}
</script>

<style>

.settingDropdow {
  display: flex;
  justify-content: space-between;
  justify-items: center;
  align-items: center;
  width: 100%;
}

.description{
  font-size: 20px;
}



</style>
