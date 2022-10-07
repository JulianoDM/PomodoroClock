<template>
  <div>
    <v-container class="clock">
      <v-row>
        <v-col>
          <v-card width="500" class="mx-auto">
            <v-card-actions>
              <v-tabs show-arrows centered>
                <v-tab
                  v-for="timer in timers"
                  :key="timer"
                  @click="changeTimer(timer)"
                  >{{ timer }}</v-tab
                >
              </v-tabs>
            </v-card-actions>
            <div>
              <v-card-text
                v-if="timer.seconds < 10"
                class="d-flex justify-center text-h1 grey--text"
                >{{ timer.minutes }}:0{{ timer.seconds }}</v-card-text
              >
              <v-card-text
                v-else
                class="d-flex justify-center text-h1 grey--text"
                >{{ timer.minutes }}:{{ timer.seconds }}</v-card-text
              >
            </div>
            <v-card-actions>
              <v-btn
                elevation="3"
                min-width="200"
                large
                @click="start"
                class="mx-auto my-5 red--text"
              >
                {{ buttonName }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <ToDo />
  </div>
</template>


<script>
import ToDo from "./ToDo.vue";
export default {
  components: { ToDo },
  data() {
    return {
      timers: ["Pomodoro", "Short Break", "Long Break"],

      timer: {
        minutes: 25,
        seconds: 0,
      },
      buttonSettings: true,
      buttonName: "Start",
    };
  },

  computed: {
    backColor() {
      return this.$store.state.backColor;
    },
  },

  methods: {
    changeTimer(name) {
      if (name === "Short Break") {
        this.backColor.default = this.backColor.short;
        this.timer.minutes = 5;
        this.timer.seconds = 0;
      } else if (name === "Long Break") {
        this.backColor.default = this.backColor.long;
        this.timer.minutes = 15;
        this.timer.seconds = 0;
      } else {
        this.backColor.default = "red accent-2";
        this.timer.minutes = 25;
        this.timer.seconds = 0;
      }
    },

    start() {
      if (this.buttonSettings === true) {
        this.buttonName = "Stop";
        this.buttonSettings = false;

        this.interval = setInterval(() => {
          if (this.timer.seconds == 0) {
            this.timer.minutes--;
            this.timer.seconds = 59;
          } else {
            this.timer.seconds--;
          }
          if (this.timer.minutes <= 0 && this.timer.seconds <= 0) {
            clearInterval(this.interval);
            alert("Time's up");
          }
        }, 1000);
      } else {
        this.buttonName = "Start";
        clearInterval(this.interval);
        this.buttonSettings = true;
        console.log(this.interval);
      }
    },
  },
};
</script>