<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-form>
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
          <v-flex lg2>
            <v-text-field
                  name="subreddit"
                  label="Subreddit"
                  v-model="subreddit"
              ></v-text-field>
          </v-flex>
          <v-flex lg1>
            <v-btn
              @click="submit"
            >
            submit
            </v-btn>
            <v-btn v-if="search_results.length > 0" @click="toggle_expand">{{show_btn_message}}</v-btn>
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
          <Comment :comment="row" v-for="row, i in search_results" :key="i" :show="show_all">
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
        "loading": false,
        "subreddit": "",
        'show_all': false
      }
    },
    computed: {
      show_btn_message() {
        if (this.show_all) {
          return "Collpase all";
        } else {
          return "Expand all";
        }
      },
      query_for_verification() {
        return this.query.toLowerCase().replace(/"/g, '');
      }
    },
    methods: {
      toggle_expand() {
        this.show_all = !this.show_all;
      },
      submit() {
        this.loading = true;
        this.error = "";
        let data = {"q": this.query, "size": this.size};
        if (this.subreddit) {
          data["subreddit"] = this.subreddit;
        }
        utils.xdr(
          "https://api.pushshift.io/reddit/comment/search/",
          "GET",
          data,
          {},
          (result) => {
            this.loading = false;
            try {
              this.search_results = _.filter(JSON.parse(result).data, (row) => {
                return row.body.toLowerCase().indexOf(this.query_for_verification) !== -1;
              });
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
<style scoped>
.md blockquote {
    border-left: 2px solid #edf1f3;
    color: #738491;
}
.md .-blocks, .md .-lists, .md pre, .md blockquote, .md table, .md p, .md ul, .md ol {
    margin-top: 0.35714285714285715em;
    margin-bottom: 0.35714285714285715em;
}
.md blockquote {
    padding: 0 8px;
    margin-left: 5px;
}
.md blockquote {
    border-left: 2px solid #c5c1ad;
}
</style>
