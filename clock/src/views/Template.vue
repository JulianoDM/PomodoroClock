<template >
  <div>
    <v-app>
      <v-app-bar dark app :color="backColor.default" flat>
        <v-spacer />
        <v-app-bar-title class="">Pomofocus</v-app-bar-title>
        <div class="d-flex" v-for="nav in navButton" :key="nav.name">
          <v-btn class="" small text>
            <v-icon class="ml-2 ml-sm-0 ml-md-0">{{ nav.icon }}</v-icon>
            <span class="d-none d-sm-flex">{{ nav.name }}</span>
          </v-btn>
        </div>
        <v-dialog v-model="dialog" persistent width="500">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class=""
              small
              text
              dark
              elevation="0"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon class="ml-2 m-sm-0 ml-md-0" id="config"> mdi-cog </v-icon>
              <span class="d-none d-sm-flex">Settings</span>
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="text-h5 grey lighten-2">
              Settings
            </v-card-title>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <span> Time (minutes) </span>
                </v-col>
                <v-col cols="12">
                  <v-responsive>
                    <v-text-field
                      filled
                      outlined
                      class=""
                      v-for="timer in timers"
                      :key="timer"
                      @click="change($event.target.value, timer)"
                      @keydown="change($event.target.value, timer)"
                      @keyup="change($event.target.value, timer)"
                      counter=""
                      :placeholder="timer"
                      min="1"
                      max="3"
                      type="number"
                    >
                    </v-text-field>
                  </v-responsive>
                </v-col>
              </v-row>
            </v-container>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <div @click="timeConfirm">
                <v-btn color="primary" text @click="dialog = false">
                  Done
                </v-btn>
              </div>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-spacer />
      </v-app-bar>

      <v-main :class="backColor.default">
        <router-view></router-view>
      </v-main>
    </v-app>
  </div>
</template>


<script>
export default {
  data() {
    return {
      navButton: [
        { name: "Report", icon: "mdi-chart-box" },
        { name: "login", icon: "mdi-account" },
      ],

      timers: ["Pomodoro", "Short Break", "Long Break"],
      dialog: false,
    };
  },

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
  },

  methods: {
    change(timer, name) {
      if (name === "Pomodoro"){
        this.pomodoro.minutes = timer;
        this.pomodoro.pomodoro = timer;
   
      }
      if (name === "Short Break") {
        this.short.minutes = timer;
        this.short.short = timer;
        
      }
      if (name === "Long Break") {
        this.long.minutes = timer;
        this.long.long = timer;
        
      }
    },

    timeConfirm(){
      
      if(this.pomodoro.minutes <= 0){
        this.pomodoro.minutes = 25;
        this.pomodoro.pomodoro = 25;
        alert('Only positive numbers!')
      }
      else if(this.pomodoro.minutes > 120){
        this.pomodoro.minutes = 25;
        this.pomodoro.pomodoro = 25;
        alert('You need rest: Limit is 120 minutes')
      }

      if(this.short.minutes <= 0){
        this.short.minutes = 5;
        this.short.short = 5;
        alert('Only positive numbers!')
      }
      else if(this.short.minutes > 25){
        this.short.minutes = 5;
        this.short.short = 5;
        alert('This is just a SHORT BREAK: Limit is 25 minutes')
        
      }

      if(this.long.minutes <= 0){
        this.long.minutes = 15;
        this.long.long = 15;
        alert('Only positive numbers!')
      }
      else if(this.long.minutes > 60){
        this.long.minutes = 15;
        this.long.long = 15;
        alert('If you need more rest, is time to stop: Limit is 60 minutes')
      }
    }
  },
};
</script>

<style>
#responsive_input {
  border: 2px dashed rgb(0, 0, 0);
  border-radius: 1rem;
  height: 40px;
}
</style>