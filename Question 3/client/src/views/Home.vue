<template>
  <div class="hero is-fullheight is-primary">
    <div class="hero-body">
      <div class="container">
        <h3 class="title has-text-white">Login</h3>
        <div class="box">
          <div class="field">
            <label class="label">Username</label>
            <div class="control">
              <input class="input" v-model="username" placeholder="username">
            </div>
          </div>

          <div class="field">
            <label class="label">Password</label>
            <div class="control">
              <input class="input" v-model="password" type="password" placeholder="********">
            </div>
          </div>

          <div class="control block">
            <label class="radio">
              <input type="radio" name="vulnerable" @change="safe = false" :checked="!safe">
              SQL Injection Vulnerability
            </label>
            <label class="radio">
              <input type="radio" name="invulnerable" @change="safe = true" :checked="safe">
              No Vulnerability
            </label>
          </div>

          <button class="button is-primary" @click="login">Sign in</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Home extends Vue {
  username = '';
  password = '';
  safe = false;

  async login() {
    await this.$store.dispatch('login', { username: this.username, password: this.password, safe: this.safe });
    this.$router.push('about');
  }
}
</script>
