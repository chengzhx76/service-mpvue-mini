<script>
export default {
  created () {
    console.log('miniapp created!!!')
  },
  onLaunch (options) {
    console.log('miniapp onLaunch!!!')
    console.log(options)
  },
  onError (msg) {
    console.log(msg)
  }
}
</script>

<style>

</style>
