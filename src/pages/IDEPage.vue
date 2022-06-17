<template>
  <div class="page">
    <editortab></editortab>

    <section class="editorSection">
      <div class="folderTree">
        <ul id="myUL">
          <nodetree :node="tree" :onClick="handleFileClick"></nodetree>
        </ul>
      </div>
      <div class="editorContainer">
        <div class="noFileSelected" v-if="currentFilePath == ''">
          <h3>Brokr Editor</h3>
          <h5>Select a file to begin coding</h5>
        </div>
        <div id="editor"></div>
        <div id="console">
          <div class="terminalActions">
            <q-btn color="white" flat round icon="close" @click="closeTerminal" />
          </div>
          <input id="consoleInput" type="text" autocomplete="off" placeholder="Enter into the console">
          <p id="consoleContent"></p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import EditorTab from "src/components/EditorTab.vue";
import * as monaco from "monaco-editor";
import NodeTree from "src/components/NodeTree.vue";
import { Cookies,useQuasar } from 'quasar';
import emitter from 'tiny-emitter/instance'

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

const extensionToLanguage = (ex) => {
  switch(ex){
    case ".js":
      return "javascript";
    case ".html":
      return "html";
    case ".json":
      return "json";
    case ".css":
      return "css";
    default:
      return "";
  }
}


export default {
  components: {
    editortab: EditorTab,
    nodetree: NodeTree,
  },
  data() {
    return {
      tree: nodetree,
      editor: null,
      userSaved:false,
      currentFilePath:"",
      ws:null,
      counter: 1
    };
  },
  methods:{
    showTerminal(){
      document.getElementById("console").style.display = "block";
    },
    closeTerminal(){
      document.getElementById("console").style.display = "none";
    },
    clearTerminal(){
      document.getElementById("consoleContent").innerHTML = "";
    },
    sendFileContent(path,content){
      let accessToken = Cookies.get("accessToken")

      fetch("http://localhost:3000/services/fileContent?path=/" + path,{
        method: "post",
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'bearer ' + accessToken
        },
        body:JSON.stringify({
          content: content
        })
      })
      .catch(error => {
        console.error(error)
      })
    },
    fetchFileContent(path,cb){
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
          cb(text);
        })
        .catch(error => {
          console.log("Fetch Error: " + error)
        })
    },

    handleFileClick(file){
      this.currentFilePath = file.path;
      // get file content -> check if session storage has that file
      if(sessionStorage.getItem(file.path) == null){
        this.fetchFileContent(file.path,(text => {
          // save it in the session storage
          sessionStorage.setItem(file.path,text);
          // change editor content
          this.setEditorModel(text,extensionToLanguage(file.extension));
        }))
      }
      else{   // if content is stored inside it already
        const contentFromPath = sessionStorage.getItem(file.path);
        //console.log(contentFromPath)
        this.setEditorModel(contentFromPath,extensionToLanguage(file.extension));
      }
    },
    setEditorModel(code,language){
      window.editor.getModel().setValue(code);
      monaco.editor.setModelLanguage(window.editor.getModel(),language);
    },
    renderMonacoEditor(){
      // init editor
      let v = this;

      window.editor = monaco.editor.create(document.getElementById("editor"), {
        theme: "vs-dark",
        value: ["function x() {", '\tconsole.log("Hello world!");', "}"].join("\n"),
        language: "javascript",
      });

      window.editor.onDidChangeModelContent(function(e) {
          v.userSaved = false;
          v.saveCurrentCodeSessionStorage();
      });
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
    },
    setupKeyboardShortcuts(){
      document.addEventListener("keydown",this.handleDownEvent)
    },
    saveCurrentCodeSessionStorage(){
      const code = window.editor.getModel().getValue();
      sessionStorage.setItem(this.currentFilePath,code);
    },
    async handleDownEvent(event){
      if((event.ctrlKey||event.metaKey) && event.key === 's'){
        event.preventDefault();

        this.userSaved = true;

        this.$q.notify({
          position: "bottom-right",
          progress:true,
          color:"primary",
          message:"Saving file ...",
          timeout:1500
        })

        this.sendFileContent(
          this.currentFilePath,
          window.editor.getModel().getValue()
        );
        //console.log("saving to service!");
      }
    },
    attachActionsEventHandler(){
      emitter.on("runService",() => {
        if(!this.ws){
          this.initWebsocket();
          this.startService();
          this.showTerminal();
        }
        else {
          //this.ws = null;
          this.clearTerminal();
          this.writeToConsole("Restarting service ... \n")
          this.stopService();
          this.startService();
          this.showTerminal();
        }
        // create a WebSocket connection to show the console ... oh boy amiright
      })
      emitter.on("stopService",() => {
        this.clearTerminal();
        this.closeTerminal();

        if(this.ws){
          this.stopService();
        }

      })

      emitter.on("terminal",() => {
        document.getElementById("console").style.display = "block";
      })
    },
    initWebsocket(){
      let accessToken = Cookies.get("accessToken");

      this.ws = new WebSocket("ws://localhost:4200");
      //this.showTerminal();
      //this.clearTerminal();

      /*
      this.ws.onopen = (e) => {
        this.startService();
      }
      */

      this.ws.onmessage = (e) => {
        this.writeToConsole(e.data);
      }
    },
    writeToConsole(data){
      let el = document.getElementById("consoleContent");
      el.scrollTop = el.scrollHeight;
      el.innerHTML = el.innerHTML + data + "<br>";
    },
    removeEvListener(){
      document.removeEventListener("keydown",this.handleDownEvent)
      emitter.off("runService");
      emitter.off("stopService");
      emitter.off("terminal");
    },
    setupConsole(){
      let v = this;
      const el =  document.getElementById("consoleInput")
      el.onkeydown = (e) => {
          console.log()
          if(e.key == "Enter"){
            v.writeToConsole(" > " + el.value)
            let accessToken = Cookies.get("accessToken")

            if(v.ws.readyState === WebSocket.OPEN){
                v.ws.send(JSON.stringify(
                  {
                      "accessToken":"bearer " + accessToken,
                      "action":{
                          "type":"shellCommand",
                          "serviceID":v.service.ID,
                          "command":el.value
                      }
                  }
                ))

                el.value = "";
              }
          }

      }
    },
    startService(){
      let accessToken = Cookies.get("accessToken");

      this.ws.send(JSON.stringify(
          {
              "accessToken":"bearer " + accessToken,
              "action":{
                  "type":"runService",
                  "serviceID":this.service.ID
              }
          }
        ));
    },
    stopService(){
      let accessToken = Cookies.get("accessToken");

      this.ws.send(JSON.stringify(
            {
                "accessToken":"bearer " + accessToken,
                "action":{
                    "type":"stopService",
                    "serviceID":this.service.ID
                }
            }
          ))
    }

  },
  mounted() {
    if(this.$route.params.service == undefined){
      this.$router.push("/")
      return;
    }
    this.fetchDirectoryTree();
    this.renderMonacoEditor();
    this.setupKeyboardShortcuts();
    this.attachActionsEventHandler();
    this.initWebsocket();
    this.setupConsole();
  },
  beforeRouteLeave(to,from,next){
    if(!this.userSaved){
      const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
      if (answer) {
        this.removeEvListener();
        sessionStorage.clear();
        next();
      } else {
        next(false);
      }
    }else {
      this.removeEvListener();
      sessionStorage.clear();
      next();
    }
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
  flex-basis: 100%;
  width: 100%;
  height: calc(100vh - 70px);
}

.folderTree {
  width: 450px;
  height: 100vh;
  color: white;
  border-right: solid 1px rgb(67, 67, 67);
}

#editor {
  margin: 0;
  padding: 0;
  background-color: rgb(19, 19, 19);
  color:aqua;
  height:100%;
}

ul,
#myUL {
  list-style-type: none;
}

#myUL {
  margin: 0;
  padding: 0;
}

.editorContainer{
  background-color: rgb(32, 32, 32);
  position: relative;
  width:100%;
  height: 100%;
}

.noFileSelected{
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color:rgb(19, 19, 19);
  color:white;
  position: absolute;
  z-index: 3;
}

#console{
  display: none;
  position: absolute;
  background-color: rgb(32, 32, 32);
  bottom:0;
  height: 35%;
  width: 100%;
  z-index: 3;
  border-top: solid 1px rgb(67, 67, 67);
}

#console > input {
  margin: 10px 20px 0px 10px;
  background-color: rgb(67, 67, 67);
  border: none;
  color:white;
  width: 92%;
  font-family: monospace;
}

#consoleContent{
  color:white;
  height: 100%;
  overflow-y: scroll;
  font-family: monospace;
  padding: 0;
  margin: 10px 50px 40px 10px;
  font-size: 15px;
}

.terminalActions{
  position: absolute;
  right:0;
  margin:5px;
}



.page {
  background-color: rgb(32, 32, 32);
  overflow:hidden;
}
</style>
