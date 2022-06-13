<template>
    <li class="node-tree">
        <span class="caret"></span>
        <div @click="handleClick" class="text-custom bgHover">
            <q-icon :name="arrowDown?'expand_more':'navigate_next'" />
            📁 {{node.name}}
        </div>

        <ul class="nested">
            <node v-for="(child,index) in node.children" :key="index" :node="child"></node>
            <div v-for="(content,index1) in node.content" :key="index1+1000" class="text-custom2 bgHover text-weight-light q-ma-xs">
              <span>
                  <q-img
                    :src="getFileIconURL(content.fileName)"
                    class="q-mr-sm"
                    width="15px"
                    height="15px" />
                  {{content.fileName}}
              </span>
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
    node: Object
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
    handleFileClick(content){

        console.log("handleClick")

        console.log(JSON.stringify(content))

        var token = localStorage.getItem('accessToken')

        var myHeaders =  new Headers({
            'Authorization': 'Bearer '+ token,
        })

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };

        fetch(`https://demo-bridge.gmail2ecm.com/getResource?filePath=${content.path}&fileName=${content.fileName}`,requestOptions)
            .then(resp => resp.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = content.fileName;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            })
            .catch((e) => console.log(e));
    }

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
    font-size: 1em;
    user-select: none;
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
