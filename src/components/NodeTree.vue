<template>
    <li class="node-tree">
        <span class="caret"></span>
        <div @click="handleClick" class="text-custom bgHover">
            <q-icon :name="arrowDown?'expand_more':'navigate_next'" />
            📁 {{node.name}}
            <q-menu
              touch-position
              context-menu
              dark
            >
              <q-list dense style="min-width: 100px">
                <q-item @click="onNewFile?.(node.path)" clickable v-close-popup>
                  <q-item-section>New File</q-item-section>
                </q-item>
                <q-item @click="onNewFolder?.(node.path)" clickable v-close-popup>
                  <q-item-section>New Folder</q-item-section>
                </q-item>
                <q-separator />
                <q-item @click="onRename?.(node.path)" clickable v-close-popup>
                  <q-item-section>Rename</q-item-section>
                </q-item>
                <q-item @click="onRemove?.(node.path)" clickable v-close-popup>
                  <q-item-section>Remove</q-item-section>
                </q-item>
              </q-list>

            </q-menu>
        </div>

        <ul class="nested">
          <!-- show all directories first -->
          <div v-for="(child,index) in node.children" :key="index">
            <node
              v-if="child.type=='directory'"
              :onClick="onClick"
              :node="child"
              :onRemove="onRemove || null"
              :onRename="onRename || null"
              :onNewFile="onNewFile || null"
              :onNewFolder="onNewFolder || null"
              :onRenameFile="onRenameFile || null"
              :onRemoveFile="onRemoveFile || null"
            >
            </node>
          </div>

          <!-- then show all files  -->
          <div v-for="(child,index) in node.children" :key="index + 1000">
            <div v-if="child.type=='file'" class="text-custom2 bgHover text-weight-light q-ma-xs" @click="handleFileClick(child)">
              <span>
                  <q-img
                    :src="getFileIconURL(child.name)"
                    class="q-mr-sm"
                    width="15px"
                    height="15px" />
                  {{child.name}}
              </span>
               <q-menu
                    touch-position
                    context-menu
                    dark
                  >
                    <q-list dense style="min-width: 100px">
                      <q-item @click="onRenameFile?.(node.path + '/' + child.name)" clickable v-close-popup>
                        <q-item-section>Rename</q-item-section>
                      </q-item>
                      <q-item @click="onRemoveFile?.(node.path + '/' + child.name)" clickable v-close-popup>
                        <q-item-section>Remove</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
            </div>
          </div>
        </ul>
    </li>
</template>

<script>

const iconSrc = {
  "ejs":"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/devicon/devicon-original.svg",
  "json":"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/devicon/devicon-original.svg",
  "html":"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  "js":"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  "css":"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  "other":"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/devicon/devicon-original.svg"
}

export default {
  name: "node",
  data(){
      return{
         nodePath:null,
         arrowDown:false
      }
  },
  props: {
    node:Object,
    onClick:{
      type:Function,
    },
    onNewFile:{
      type: Function,
    },
    onNewFolder:{
      type: Function,
    },
    onRename:{
      type: Function,
    },
    onRemove:{
      type: Function,
    },
    onRenameFile:{
      type: Function,
    },
    onRemoveFile:{
      type: Function,
    },
  },
  methods: {
    getFileIconURL(filename){
      let lastVal = filename.split(".").pop();
      if(iconSrc[lastVal] === undefined){
        return iconSrc["other"]
      }
      else  return iconSrc[lastVal];
    },
    handleClick(event){
        try{
            //console.log(event)
            event.target.parentElement.querySelector(".nested").classList.toggle("active");
            event.target.classList.toggle("caret-down");
            this.arrowDown = !this.arrowDown;
        }catch(e){
            //do nothing
        }
    },
    handleFileClick(file){
        this.onClick(file);
    },
  },
};
</script>

<style scoped>

  ul, #myUL {
      list-style-type: none;
      padding-left:15px;
  }

  .text-custom{
    user-select: none;
    cursor: pointer;
    font-size: 1em;
  }

  .text-custom::before{
      cursor: pointer;
      font-size: 140%;
  }

  .text-custom2{
    user-select: none;
    font-size: 1em;
  }

  #myUL {
      margin: 0;
      padding: 0;
  }

  .bgHover {
      padding: 2px;
      transition-duration: 300ms;
  }

  .list-item {
    display: inline-block;
    margin-right: 10px;
    }
    .list-enter-active, .list-leave-active {
    transition: all 1s;
    }
    .list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(30px);
    }

  .bgHover:hover {
      background-color: #434343;
  }

  .caret::before {
      color: black;
      display: inline-block;
      margin-right: 6px;
  }

  .caret-down::before {
      transform: rotate(90deg);
  }

  .nested {
      display: none;
  }

  .active {
      display: block;
  }
</style>
