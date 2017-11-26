<template>
  <v-expansion-panel expand v-on:keyup.74="on_down(i)">
    <Comment
      :active="i == current_active"
      :comment="comment"
      v-for="comment, i in comments"
      :key="i"
      @click="on_click(i)"
    >
    </Comment>
  </v-expansion-panel>
</template>
<script>
  import Comment from './Comment'
  export default {
    components: {
      Comment
    },
    props: ['comments'],
    data() {
      return {
        'current_active': 0
      }
    },
    methods: {
      on_click(i) {
        this.current_active = i;
      },
      on_down(i) {
        if (i < this.comments.length - 1) {
          this.current_active = i + 1;
        }
      }
    }
  }
</script>
