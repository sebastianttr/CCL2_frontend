<template>
  <div class="q-mb-lg q-mt-md">
    <div v-if="isEditable" class="editField appear">
      <q-input outlined class="full-width input" dense  :input-style="{fontSize:'20px'}" v-model="model" type="text" />
      <q-btn round flat color="primary" class="q-ml-md" icon="save" @click="save" />
    </div>
    <div v-else class="editField appeal nonEditable">
      <h6 class="full-width">{{model}}</h6>
      <q-btn round flat color="grey" icon="edit" @click="edit" />
    </div>
  </div>
</template>

<script>
export default {
  name:"EditableField",
  props:{
    label: {
      type: String
    },
    model: {
      type: String
    },
    onChange:{
      type:Function
    }
  },
  data(){
    return {
      isEditable:false,
    }
  },
  methods:{
    save(){
      this.onChange?.(this.model);
      this.isEditable = false;
    },
    edit(){
      this.isEditable = true;
    }
  },
  watch:{

  },
  beforeMount(){

  }
}
</script>

<style>

.editField{
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  flex-direction: row;
  width: 100%;
  height: 30px;
}

.appear{
  opacity: 1;
  animation: fadeInAnimation 1s cubic-bezier(.09,.91,.12,.98);
}

@keyframes fadeInAnimation {
  0%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
}

</style>
