<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <div width="500" class="d-flex justify-center">
            <span>#0</span>
          </div>
          <div width="500" class="d-flex justify-center">
            <span>Task</span>
          </div>
          <v-responsive id="responsive_input" class="mx-auto" max-width="500">
            <v-text-field
              @keydown.enter="addTask($event.target.value)"
              id="input_text"
              :placeholder="textInput"
              :background-color="backColor.default"
              color="white"
              dense
              solo
              flat
            ></v-text-field>
          </v-responsive>
          <v-card
            v-for="(task, index) in tasks"
            :key="task.id"
            width="500"
            class="mx-auto mt-3 d-flex align-center justify-space-between"
            elevation="5"
            @click="confirmTask($event.target)"
          >
            <v-card-title id="cardName">{{ task.name }}</v-card-title>
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn elevation="0"  v-bind="attrs" v-on="on">
                  <v-icon>
                    mdi-dots-vertical
                  </v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item>
                  <v-list-item-title @click="removeTask(index)">Remove Task</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      buttonSettings: true,
      buttonName: "Start",
      tasks: [],
      textInput: "add a task",
      taskId: 0,
    };
  },

  computed: {
    backColor() {
      return this.$store.state.backColor;
    },
  },

  methods: {
    addTask(task) {
      if (task === "") {
        this.clearInput();
        this.textInput = "empty task";
      } else {
        const add = {
          name: task,
          id: this.taskId,
        };
        this.taskId++;
        this.clearInput();
        this.tasks.push(add);

        this.textInput = "add a task";
      }
    },

    confirmTask(task) {
      let content = task;
      content.classList.toggle("confirm");
    },

    removeTask(index) {
      this.tasks.splice(index, 1);
    },

    clearInput() {
      document.querySelector("#input_text").value = "";
    },
  },
};
</script>

<style>
.confirm {
  background-color: green;
  color: whitesmoke;
}
</style>