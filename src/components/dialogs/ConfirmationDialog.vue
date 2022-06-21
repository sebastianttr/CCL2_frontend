<template>
  <q-dialog
      v-model="model"
      persistent
      transition-show="slide-up"
      transition-hide="slide-down">
      <q-card class="bg-white text-black" style="width: 500px;border-radius:20px;">
        <q-card-section>
          <div class="text-h6">{{title}}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          {{text}}
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-primary">
          <q-btn flat rounded label="No" @click="onCancel" v-close-popup />
          <q-btn flat rounded color="red" :label="confirmText" @click="onConfirm" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>

<script>
export default {
  name:"ConfirmationDialog",
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
    onCancel:{
      type: Function,
      required: true,
    },
    onConfirm: {
      type: Function,
      required: true,
    },
    confirmText:{
      type:String,
    }
  }
}
</script>

<style>

</style>
