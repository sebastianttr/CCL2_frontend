<template>
  <div class="settingDropdow">
    <p class="description">{{description}}</p>
    <q-select class="select" :input-class="{ 'select': true }" dense outlined v-model="model" :options="options"/>
  </div>
</template>

<script>
export default {
  name:"SettingDropdown",
  props:{
    description:{
      type:String
    },
    model:{
      type:String
    },
    options:{
      type:Array
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
