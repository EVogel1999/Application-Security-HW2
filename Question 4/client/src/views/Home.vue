<template>
  <div class="hero is-fullheight is-primary">
    <div class="hero-body is-2">
      <div class="column is-one-quarter">
        <h3 class="title has-text-white">Post Message</h3>
        <div class="box">
          <textarea v-model="message"></textarea>
          <button class="button is-primary" @click="postMessage()">Post</button>
        </div>
      </div>
      <div class="column">
        <h3 class="title has-text-white">Messages</h3>
        <div v-for="message in messages" :key="message.id" class="box">
          <p v-html="message.message"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Home extends Vue {
  message = '';

  mounted() {
    this.$store.dispatch('getMessages');
  }

  get messages() {
    return this.$store.state.messages;
  }

  async postMessage() {
    await this.$store.dispatch('createMessage', { message: this.message });
    this.message = '';
  }
}
</script>

<style lang="scss" scoped>
textarea {
  display: block;
  width: 100%;
  min-height: 300px;
  margin-bottom: 10px;
}
</style>