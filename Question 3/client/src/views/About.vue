<template>
  <div class="hero is-fullheight is-primary">
    <div class="hero-body">
      <div class="container">
        <h3 class="title has-text-white">Your Account</h3>
        <div class="box">
          <table>
            <tr>
              <th>Username</th>
              <th>Password</th>
            </tr>
            <tr>
              <td>{{ user.username }}</td>
              <td>{{ user.password }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class About extends Vue {
  get user() {
    return this.$store.state.user;
  }
}
</script>

<style lang="scss" scoped>
h4 {
  margin-bottom: 10px !important;
}
table {
  width: 100%;
}
</style>