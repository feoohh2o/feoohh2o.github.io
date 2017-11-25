<template>
    <v-expansion-panel-content v-model="expand" @click="on_click">
    <div slot="header"  @click="on_click">
      <a :href="`https://www.reddit.com/u/${comment['author']}`">{{comment["author"]}}</a> in
      <a :href="`https://www.reddit.com/r/${comment['subreddit']}`">{{comment["subreddit"]}}</a>:
      {{preview}}
    </div>
    <v-card>
      <v-card-text class="grey lighten-3">
        <div v-html="body"></div>
        <a :href="`https://www.reddit.com${comment['permalink']}`">
          permalink
        </a>
      </v-card-text>
    </v-card>
  </v-expansion-panel-content>
</template>
<script>
  import marked from 'marked'
  import utils from '../../utils.js'
  export default {
    props: ['comment'],
    data() {
      return {
        expand: false
      };
    },
    computed: {
      decoded() {
        return utils.decode_string(this.comment['body']);
      },
      preview() {
        return this.decoded.slice(0, 100) + '...';
      },
      body() {
        return marked(this.decoded,  { sanitize: true });
      }
    },
    methods: {
      on_click() {
        this.expand = !this.expand;
      }
    }
  }
</script>
