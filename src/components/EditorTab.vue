<template>
  <section class="tab">
    <div v-for="(item, index) in tabs" :key="index + 1000">
      <div :class="'tabItem' + index + (showTabs ? ' tabItemHover' : '')">
        <div class="tabItem" v-on:click="showDropdown">
          {{ item.name }}
        </div>
        <div class="tabDropdown">
          <div
            v-for="(child, childIndex) in item.content"
            :key="childIndex"
            class="tabItemChild"
            :click="handleSelectedItem"
          >
            {{ child.name }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "EditorTab",
  data() {
    return {
      showTabs: false,
      bodyPressed: false,
      tabs: [
        {
          name: "File",
          content: [
            {
              name: "New file",
            },
            {
              name: "New folder",
            },
            {
              name: "Save file locally",
            },
          ],
        },
        {
          name: "Edit",
          content: [
            {
              name: "Undo",
            },
            {
              name: "Redo",
            },
            {
              name: "Cut",
            },
            {
              name: "Copy",
            },
            {
              name: "Paste",
            },
          ],
        },
        {
          name: "Selection",
        },
        {
          name: "View",
        },
        {
          name: "Terminal",
        },
      ],
    };
  },
  methods: {
    showDropdown(event) {
      if (!this.bodyPressed) {
        console.log("i was pressed! cancel body");
        this.showTabs = true;
        event.stopPropagation();
      }
    },
    handleSelectedItem(ev, itemName) {
      console.log(ev);
      //ev.stopPropagation();
      console.log("Hello World!");
    },
  },
  beforeMount() {
    document.getElementsByTagName("body")[0].addEventListener("mousedown", () => {
      this.bodyPressed = true;

      if (this.showTabs) {
        this.showTabs = false;
      }
    });
    document.getElementsByTagName("body")[0].addEventListener("mouseup", () => {
      this.bodyPressed = false;
    });
  },
};
</script>

<style>
.tab {
  width: 100%;
  height: 25px;
  background-color: rgb(42, 42, 42);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: white;
}

.tabItem {
  cursor: pointer;
  user-select: none;
  padding: 0px 10px 0px 10px;
  border-radius: 5px;
  font-size: 15px;
}

.tabItem:hover {
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.2);
}

.tabItemHover:hover .tabDropdown {
  display: block;
}

.tabDropdown {
  display: none;
  position: absolute;
  cursor: pointer;
  background-color: rgb(41, 41, 41);
  box-shadow: 0px 0px 20px 2px rgba(0, 0, 0, 0.35);
}

.tabItemChild {
  cursor: pointer;
  padding: 0px 30px 0px 10px;
  font-size: 15px;
  background-color: rgb(41, 41, 41);
}

.tabItemChild:hover {
  background-color: rgba(0, 0, 0, 0.2);
}
</style>
