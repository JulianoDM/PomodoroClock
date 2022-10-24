<template>
  <div>
    <v-container class="clock">
      <v-row>
        <v-col>
          <v-card width="500" class="mx-auto">
            <v-card-actions>
              <v-tabs show-arrows v-model="tab" centered>
                <v-tab
                  v-for="timer in timers"
                  :key="timer"
                  @click="changeTimer(timer, $event.target.value)"
                  >{{ timer }}</v-tab
                >
              </v-tabs>
            </v-card-actions>
            <div>
              <v-card-text
                v-if="names == 'Short Break'"
                class="d-flex justify-center text-h1 grey--text"
                
              >
                {{ short.minutes }}:{{zeros.zeroS}}{{ short.seconds}}
              </v-card-text>

              <v-card-text
                v-else-if="names == 'Long Break'"
                class="d-flex justify-center text-h1 grey--text"
              >
                {{ long.minutes }}:{{zeros.zeroL}}{{ long.seconds }}
              </v-card-text>
              <v-card-text v-else class="d-flex justify-center text-h1 grey--text">
                {{ pomodoro.minutes}}:{{zeros.zeroP}}{{ pomodoro.seconds }}
              </v-card-text>

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
            <audio class="clockStart">
              <source src="../assets/clockStart.mp3" />
            </audio>
            <audio class="clockAlarm">
              <source src="../assets/clockAlarm.mp3" />
            </audio>
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
      tab: null,
      counter: 0,
      names: "",
      zeros:{
        zeroP:"0", zeroS: "0", zeroL:"0"
      },

      buttonSettings: true,
      buttonName: "Start",
    };
  },

  filters: {},
  computed: {
    backColor() {
      return this.$store.state.backColor;
    },

    pomodoro() {
      return this.$store.state.pomodoro;
    },

    short() {
      return this.$store.state.short;
    },

    long() {
      return this.$store.state.long;
    },

    timer() {
      return this.$store.state.timer;
    },

  },

  watch: {
    
  },

  methods: {
    changeTimer(name) {
      let clockStart = document.querySelector(".clockStart");
      // let clockAlarm = document.querySelector(".clockAlarm");
      if (name === "Short Break") {
        this.names = name;
        this.backColor.default = this.backColor.short;
        this.short.minutes = this.short.short;
        this.short.seconds = 0;
        this.zeroTimerS();

        this.pomodoro.minutes = this.pomodoro.error;
        this.long.minutes = this.pomodoro.error;
        this.pause(clockStart);
      } else if (name === "Long Break") {
        this.names = name;
      
        this.backColor.default = this.backColor.long;
        this.long.minutes = this.long.long;
        this.long.seconds = 0;
        this.zeroTimerL();
        
        this.pomodoro.minutes = this.pomodoro.error;
        this.short.minutes = this.pomodoro.error;
        this.pause(clockStart);
      } else {
        this.names = "Pomodoro";
        
        this.backColor.default = "red accent-2";
        this.pomodoro.minutes = this.pomodoro.pomodoro;
        this.pomodoro.seconds = 0;
        this.zeroTimerP();
        this.pause(clockStart);

        this.long.minutes = this.pomodoro.error;
        this.short.minutes = this.pomodoro.error;
      }
    },


    zeroTimerP(){
      if(this.pomodoro.seconds < 10){
        this.zeros.zeroP = "0"
      }else{
        this.zeros.zeroP = ""
      }
    },  

    zeroTimerS(){
      if(this.short.seconds < 10){
        this.zeros.zeroS = "0"
      }else{
        this.zeros.zeroS = ""
      }

    },

    zeroTimerL(){
      if(this.long.seconds < 10){
        this.zeros.zeroL = "0"
      }else{
        this.zeros.zeroL = ""
      }

    },

    start() {
      let clockStart = document.querySelector(".clockStart");
      let clockAlarm = document.querySelector(".clockAlarm");

      if (this.buttonSettings === true) {
        this.buttonName = "Stop";
        this.buttonSettings = false;
        clockStart.play();

        this.interval = setInterval(() => {
          if (this.pomodoro.seconds == 0) {
            this.pomodoro.minutes--;
            this.pomodoro.seconds = 59;
            this.zeroTimerP()
          } else {
            this.pomodoro.seconds--;
            this.zeroTimerP()
          }

          if (this.short.seconds == 0) {
            this.short.minutes--;
            this.short.seconds = 59;
            this.zeroTimerS()
          } else {
            this.short.seconds--;
            this.zeroTimerS()
          }

          if (this.long.seconds == 0) {
            this.long.minutes--;
            this.long.seconds = 59;
            this.zeroTimerL()
          } else {
            this.long.seconds--;
            this.zeroTimerL()
          }

          if (this.pomodoro.minutes <= 0 && this.pomodoro.seconds <= 0) {
            this.endTimer(clockAlarm, clockStart);
          }

          if (this.short.minutes <= 0 && this.short.seconds <= 0) {
            this.endTimer(clockAlarm, clockStart);
          }

          if (this.long.minutes <= 0 && this.long.seconds <= 0) {
            this.endTimer(clockAlarm, clockStart);
          }
        }, 1000);
      } else {
        this.pause(clockStart);
      }
    },

    pause(clockStart) {
      clockStart.pause();
      clockStart.currentTime = 0;
      this.buttonName = "Start";
      clearInterval(this.interval);
      this.buttonSettings = true;
    },

    endTimer(clockAlarm, clockStart) {
      clockAlarm.play();
      clearInterval(this.interval);

      if (this.tab == 0) {
        this.counter++;
        if (this.counter == 3) {
          this.tab = 2;
          this.changeTimer("Long Break");
          this.counter = 0;
          this.pause(clockStart);
        } else {
          this.tab = 1;
          this.changeTimer("Short Break");
          console.log(this.counter);
          this.pause(clockStart);
        }
      } else {
        this.tab = 0;
        this.changeTimer("Pomodoro");
        this.pause(clockStart);
      }
    },
  },
};
</script>