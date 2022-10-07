<template >
  <div>
    <v-app>
      <v-app-bar dark app :color="backColor.default" flat>
        <v-container class="py-0 fill-height">
          <v-spacer />
          <v-app-bar-title>Pomofocus</v-app-bar-title>

          <div class="d-flex" v-for="nav in navButton" :key="nav.name">
            <v-btn class="d-none d-sm-flex" small  text>
              {{ nav.name }}
            </v-btn>
            <v-icon class="
            ml-4 
            ml-sm-0
            ml-md-0">{{nav.icon}}</v-icon>
          </div>
          <v-spacer/>
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
        {name:"Report", icon:"mdi-chart-box"},
        {name:"Settings", icon:"mdi-cog"},
        {name: "login", icon:"mdi-account"}
      ],
    };
  },

  computed: {
    backColor(){
      return this.$store.state.backColor
    }
  },
};
</script>

<style>


#responsive_input{
  border: 2px dashed rgb(0, 0, 0);
  border-radius: 1rem;
  height: 40px;
}

</style>