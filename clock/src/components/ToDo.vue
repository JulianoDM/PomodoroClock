<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <div width="500" class="d-flex justify-center">
            <span>#{{ taskCounter }}</span>
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
              v-model="letterCount"
              :rules="rules"
              counter
              maxlength="200"
              hint="This field uses maxlength attribute"
            ></v-text-field>
          </v-responsive>
          <div class="counter">
            <p class="">{{ letterCount.length }}/200</p>
          </div>

          <v-card
            v-for="(task, index) in tasks"
            :key="task.id"
            max-width="500"
            :color=task.color
            class="mx-auto mt-3 d-flex align-center justify-space-between"
            elevation="5"
            @click="confirmTask(task)"
          >
            <p class="taskConfirm ma-5">{{task.name}}</p>
            <v-btn small class="my-5 mr-2" @click="removeTask(index)"
              >Remove</v-btn
            >
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
      taskCounter: 0,
      letterCount: "",
      rules: [(v) => v.length <= 200 || "Max 200 characters"],
      
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
      } else if (this.taskCounter == 5) {
        alert("task over the limit");
        this.letterCount = "";
        this.textInput = "Finish a task";
      } else {
        const add = {
          name: task,
          id: this.taskId,
          color: "white"
        };
        this.letterCount = "";
        this.taskId++;
        this.taskCounter++;
        this.clearInput();
        this.tasks.push(add);

        this.textInput = "add a task";
      }
    },

    confirmTask(task) {
      if(task.color == 'white'){
        task.color = 'green'
      }else{
        task.color = 'white'
      }
    },

    removeTask(index) {
      this.tasks.splice(index, 1);
      this.taskCounter--;
    },

    clearInput() {
      document.querySelector("#input_text").value = "";
    },
  },
};
</script>

<style>
.textTesk {
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
}

.counter {
  display: flex;
  justify-content: center;
}
</style>