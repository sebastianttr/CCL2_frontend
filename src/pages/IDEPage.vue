<template>
  <div class="page">
    <editortab></editortab>

    <section class="editorSection">
      <div class="folderTree">
        <ul id="myUL">
          <nodetree :node="tree" :onClick="handleFileClick"></nodetree>
        </ul>
      </div>
      <div id="editor"></div>
    </section>
  </div>
</template>

<script>
import EditorTab from "src/components/EditorTab.vue";
import * as monaco from "monaco-editor";
import NodeTree from "src/components/NodeTree.vue";
import { Cookies } from 'quasar';

const nodetree = {
  name: "Folder 1",
  "type": "directory",
  children: [
    {
      name: "Folder 2",
      "type": "directory",
      children: [
        {
          name: "application.js",
          "type": "file",
        },
        {
          name: "index.html",
          "type": "file",
        },
        {
          name: "styles.css",
          "type": "file",
        },
        {
          name: "indexTemplate.java",
          "type": "file",
        },
      ],
    },
  ],
};

export default {
  components: {
    editortab: EditorTab,
    nodetree: NodeTree,
  },
  data() {
    return {
      tree: nodetree,
      editor: null
    };
  },
  methods:{
    handleFileClick(path){
      // get file content -> check if session storage has that file
      if(sessionStorage.getItem(path) == null){
        // get it from the server
        let accessToken = Cookies.get("accessToken")

        fetch("http://localhost:3000/services/fileContent?path=/" + path,{
          headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization':'bearer ' + accessToken
          }
        })
        .then(res => res.text())
        .then(text => {                 // if the content is here
          // save it in the session storage
          sessionStorage.setItem(path,text);
          console.log(text)
          // change editor content
          this.editor.value = text;
        })
        .catch(error => {
          console.log("Fetch Error: " + error)
        })
      }
      else{   // if content is stored inside it already
        const contentFromPath = sessionStorage.getItem(path);
        console.log(contentFromPath)
        window.editor.getModel().setValue(contentFromPath);
        monaco.editor.setModelLanguage(window.editor.getModel(),"json");
      }
    },
    renderMonacoEditor(){
      // init editor
      window.editor = monaco.editor.create(document.getElementById("editor"), {
        theme: "vs-dark",
        value: ["function x() {", '\tconsole.log("Hello world!");', "}"].join("\n"),
        language: "javascript",
      });
    },
    setNewEditorContent(){

    },
    fetchDirectoryTree(){
      //console.log(this.service)
      let accessToken = Cookies.get("accessToken")

      if(accessToken){
        fetch(`http://localhost:3000/services/${this.service.ID}/getDirectoryTree`,{
          headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization':'bearer ' + accessToken
          }
        })
          .then(res => res.json())
          .then(json => {
            this.tree = json;
          })
          .catch(err => {
            this.$router.push({name:"login"})
          })
      }
    }
  },
  mounted() {
    if(this.$route.params.service == undefined){
      this.$router.push("/")
      return;
    }

    this.fetchDirectoryTree();
    this.renderMonacoEditor();
  },
  computed:{
    service() {
      return JSON.parse(this.$route.params.service)
    }
  }
};
</script>

<style>
.editorSection {
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  width: 100%;
  height: 100%;
}

.folderTree {
  width: 450px;
  height: 100%;
  color: white;
}

#editor {
  width: 100%;
  height: 100vh;
  background-color: blanchedalmond;
  overflow-y: scroll;
}

ul,
#myUL {
  list-style-type: none;
}

#myUL {
  margin: 0;
  padding: 0;
}

.page {
  background-color: rgb(32, 32, 32);
}
</style>
