<template>
  <q-dialog
      v-model="model"
      persistent
      transition-show="slide-up"
      transition-hide="slide-down">
      <q-card class="bg-white text-black" style="width: 500px">
        <q-card-section>
          <div class="text-h6">{{title}}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input v-model="inputModel" type="text" :label="inputPlaceholder"/>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-primary">
          <q-btn flat label="Cancel" @click="onCancel" v-close-popup />
          <q-btn flat :label="confirmText" @click="onConfirm(inputModel)" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<script>
export default {
  name:"InputModelDialog",
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
    inputPlaceholder: {
      type:String,
      required: true
    },
    confirmText:{
      type: String,
      required: true
    },
    inputModel:{
      type: String,
      required: true
    },
    onCancel:{
      type: Function,
      required: true,
    },
    onConfirm: {
      type: Function,
      required: true,
    }
  }
}
</script>

<style>

</style>
