<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-form @submit.prevent="submit">
          <v-flex lg9>
          <v-text-field
                name="query"
                label="Query"
                v-model="query"
                class="input-group--focused"
                v-on:keyup.enter="submit"
            ></v-text-field>
          </v-flex>
          <v-flex lg2>
            <v-text-field
                  name="size"
                  label="Size"
                  type="number"
                  v-model="size"
              ></v-text-field>
          </v-flex>
          <v-flex lg1>
            <v-btn
              @click="submit"
            >
            submit
            </v-btn>
          </v-flex>
          <v-flex lg>
            <v-alert v-show="error" color="error" icon="warning">
              {{error}}
            </v-alert>
            <v-progress-circular v-show="loading" indeterminate color="primary"></v-progress-circular>
          </v-flex>
        </v-form>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex>
        <v-expansion-panel expand>
          <Comment :comment="row" v-for="row, i in search_results" :key="i">
          </Comment>
        </v-expansion-panel>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  import utils from '../../utils'
  import fixture from './fixture'
  import marked from 'marked'
  import _ from 'lodash';
  import Comment from './Comment'

  export default {
    components: {
        Comment
    },
    data() {
      return {
        "query": [],
        "size": 50,
        // "search_results": fixture.data,
        "search_results": [],
        "error": "",
        "loading": false
      }
    },
    methods: {
      submit() {
        this.loading = true;
        this.error = "";
        utils.xdr(
          "https://api.pushshift.io/reddit/comment/search/",
          "GET",
          {
            "q": this.query,
            "size": this.size,
            "r": new Date().getTime()
          },
          {},
          (result) => {
            this.loading = false;
            try {
              this.search_results = JSON.parse(result).data;
              console.log(this.search_results);
            } catch(err) {
              this.error = "internal error";
              console.error(err);
              return;
            }

          },
          (result) => {
            this.loading = false;
            this.error = "internal error";
            console.error(result);

          }
        )
      }
    }
  }
</script>
<style>
blockquote {
    border-left: 2px solid #edf1f3;
    color: #738491;
    margin-top: 0.35714285714285715em;
    margin-bottom: 0.35714285714285715em;
    padding: 0 8px;
    margin-left: 5px;
}
</style>
