<template>
  <div>
    <v-container class="clock">
      <v-row>
        <v-col>
          <v-card width="500" class="mx-auto">
            <v-card-actions>
              <v-tabs show-arrows 
              v-model="tab"
              centered>
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
            <audio class="clockStart">
              <source src="../assets/clockStart.mp3">
            </audio>
            <audio class="clockAlarm">
              <source src="../assets/clockAlarm.mp3">
            </audio>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <ToDo/>
   
  </div>
</template>


<script>
import ToDo from "./ToDo.vue";
export default {
  components: { ToDo },
  data() {
    return {
      timers: ["Pomodoro", "Short Break", "Long Break"],
      tempo: 'Pomodoro',
      tab: null,
      counter: 0,

      timer: {
        minutes: 0,
        seconds: 2,
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

  watch:{
    tab(val){
      console.log(val);
    }
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
        this.timer.minutes = 0;
        this.timer.seconds = 2;
      }
    },

    start() {
      let clockStart = document.querySelector('.clockStart')
      let clockAlarm = document.querySelector('.clockAlarm')
      if (this.buttonSettings === true) {
        this.buttonName = "Stop";
        this.buttonSettings = false;
        
        clockStart.play();

        this.interval = setInterval(() => {
          if (this.timer.seconds == 0) {
            this.timer.minutes--;
            this.timer.seconds = 59;
          } else {
            this.timer.seconds--;
          }
          if (this.timer.minutes <= 0 && this.timer.seconds <= 0) {
            clockAlarm.play()
            clearInterval(this.interval);
            
            
            if(this.tab == 0){
              this.counter ++
              if(this.counter == 3){
                this.tab = 2
                this.changeTimer('Long Break')
                this.counter = 0 
              }else{
                  this.tab = 1
                  this.changeTimer('Short Break')
                  console.log(this.counter);
                }
                
             }else{
              this.tab = 0
              this.changeTimer('Pomodoro')
             }
          }
        }, 1000);
      } else {
          clockStart.pause();
          clockStart.currentTime = 0;
          this.buttonName = "Start";
          clearInterval(this.interval);
          this.buttonSettings = true;
          
      }
    },
  },
};
</script>