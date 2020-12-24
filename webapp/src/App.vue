<template>
    <div id="app">
      <router-view/>
      <vue-particles color="#00aeff"
        :particleOpacity="0.7"
        :particlesNumber="80"
        shapeType="circle"
        :particleSize="4"
        linesColor="#00aeff"
        :linesWidth="2"
        :lineLinked="false"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push">
      </vue-particles>
    </div>
</template>


<script>
  export default { }
</script>
<style>
#app{
  background-color: aliceblue;
}

#particles-js { 
  width: 100%;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1; 
}

</style>
