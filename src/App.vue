<script>
export default {
  onLaunch (options) {
    this.$store.dispatch('GetConfig').then(() => {
    }).catch(error => {
      console.log(error)
    })
  },
  onError (msg) {
    console.log(msg)
  }
}
</script>

<style>

</style>
