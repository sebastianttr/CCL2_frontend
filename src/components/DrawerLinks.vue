<template>
  <div class="hoverLink">
    <div class="drawerLink fit row wrap justify-start items-center">
      <q-img
        :src=icon
        spinner-color="primary"
        spinner-size="82px"
        width="36px"
      />
      <p class="drawerText">{{title}}</p>
    </div>
  </div>

</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DrawerLinks',
  props: {
    title: {
      type: String,
      required: true
    },

    link: {
      type: String,
      default: '#'
    },

    icon: {
      type: String,
      default: ''
    }
  }
})
</script>

<style>
.drawerLink{
  width:100%;
  border-radius: 20px;
  padding: 10px 10px 10px 10px;
  background-color: rgba(0, 0, 0, 0);
  transition: background-color cubic-bezier(0,1.18,.97,.9) 0.3s;

}

.drawerLink:hover{
  background-color: rgba(0, 0, 0, 0.25);
}

.drawerText{
  pointer-events: none;
  font-size: 25px;
  margin-left:20px;
  font-weight: 400;
  word-wrap: break-word;
}


p{
  margin: 0;
}

</style>
