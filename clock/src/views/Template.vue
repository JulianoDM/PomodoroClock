<template >
  <div>
    <v-app>
      <v-app-bar dark app :color="backColor.default" flat>
        <v-container class="py-0 fill-height">
          <v-spacer />
          <v-app-bar-title>Pomofocus</v-app-bar-title>

          <div class="d-flex" v-for="nav in navButton" :key="nav.name">
            <v-btn class="d-none d-sm-flex" small text>
              {{ nav.name }}
            </v-btn>
            <v-icon class="ml-2 ml-sm-0 ml-md-0">{{ nav.icon }}</v-icon>
          </div>
          <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on, attrs }">
              <v-btn text dark elevation="0" v-bind="attrs" v-on="on">
                Settings
                <v-icon class="ml-4 ml-sm-2 ml-md-2"> mdi-cog </v-icon>
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

                  <v-col>
                    <div class="d-flex">
                      <p class="mr-3" v-for="time in timers" :key="time">{{ time }}</p>
                    </div>

                  </v-col>
                  <v-col cols="7">
                    <div class="d-flex">
                      <v-text-field
                        filled  
                        outlined
                        class="mr-3"
                        v-for="timer in timers"
                        :key="timer"
                        @click="atualiza($event.target.value, timer)"
                        counter="25"
                        type="number"
                      >
                      </v-text-field>
                    </div>
                  </v-col>
                </v-row>
              </v-container>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="dialog = false">
                  I accept
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-spacer />
        </v-container>
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
        // {name:"Settings", icon:"mdi-cog"},
      ],
      timers: ["Pomodoro", "Short Break", "Long Break"],
      dialog: false,
    };
  },

  computed: {
    backColor() {
      return this.$store.state.backColor;
    },

    pomodoro(){
      return this.$store.state.pomodoro;
    },

    short(){
      return this.$store.state.short;
    },

    long(){
      return this.$store.state.long;
    }
  },

  methods:{
    atualiza(info, name){
        if(name === 'Pomodoro'){
          this.pomodoro.minutes = info
          this.pomodoro.pomodoro = info
        }
        if(name === 'Short Break'){
          // this.pomodoro.minutes = info
          this.short.minutes = info
          this.short.short = info
        }
        if(name=== 'Long Break'){
          this.long.minutes = info
          this.long.long = info
        }
   
    }
  }
};
</script>

<style>
#responsive_input {
  border: 2px dashed rgb(0, 0, 0);
  border-radius: 1rem;
  height: 40px;
}
</style>