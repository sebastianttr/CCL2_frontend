<template>
  <div class="page">
    <editortab></editortab>

    <section class="editorSection">
      <div class="folderTree">
        <ul id="myUL">
          <nodetree :node="tree"></nodetree>
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

const nodetree = {
  name: "Folder 1",
  content: [],
  children: [
    {
      name: "Folder 2",
      content: [
        {
          fileName: "app.js",
        },
        {
          fileName: "index.html",
        },
        {
          fileName: "styles.css",
        },
        {
          fileName: "indexTemplate.java",
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
    };
  },
  mounted() {
    // init cancel
    

    // init editor
    monaco.editor.create(document.getElementById("editor"), {
      theme: "vs-dark",
      value: ["function x() {", '\tconsole.log("Hello world!");', "}"].join("\n"),
      language: "javascript",
    });
  },
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
