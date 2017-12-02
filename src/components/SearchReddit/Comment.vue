<template>
    <v-expansion-panel-content v-model="expand" @click="on_click" :class="{'active': active}">
      <div slot="header"  @click="on_click">
        <a :href="`https://www.reddit.com/u/${comment['author']}`">{{comment["author"]}}</a> in
        <a :href="`https://www.reddit.com/r/${comment['subreddit']}`">{{comment["subreddit"]}}</a>:
        {{preview}}
      </div>
      <v-card>
        <v-card-text class="grey lighten-3">
          <div v-html="body"></div>
          <a :href="permalink">
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
    props: ['comment', 'active'],
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
        let num_chars = 100;
        if (this.decoded.length > num_chars) {
          return this.decoded.slice(0, num_chars) + '...';
        } else {
          return this.decoded;
        }

        return  + '...';
      },
      body() {
        return marked(this.decoded,  { sanitize: true });
      },
      permalink() {
        return `https://www.reddit.com${this.comment['permalink']}?context=3`
      }
    },
    methods: {
      on_click() {
        this.expand = !this.expand;
        this.$emit("click");
      }
    }
  }
</script>
<style>
.active {
  background-color: lightgray !important;
}
blockquote {
    border-left: 2px solid #edf1f3;
    color: #738491;
    margin-top: .35714285714285715em;
    margin-bottom: .35714285714285715em;
    padding: 0 8px;
    margin-left: 5px;
}
</style>
