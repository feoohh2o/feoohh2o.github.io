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
        </v-form>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex>
        <p v-show="loading">Loading...</p>
        <p v-show="error">{{error}}</p>
      </v-flex>
      <v-flex>
        <v-expansion-panel expand>
          <v-expansion-panel-content v-for="row, i in search_results" :key="i">
            <div slot="header">
              <a :href="`https://www.reddit.com/u/${row['author']}`">{{row["author"]}}</a> in
              <a :href="`https://www.reddit.com/r/${row['subreddit']}`">{{row["subreddit"]}}</a>:
              {{row['body'].slice(0, 100) + '...'}}
            </div>
            <v-card>
              <v-card-text class="grey lighten-3">
                {{row['body']}}
                <a :href="`https://www.reddit.com${row['permalink']}`">
                  permalink
                </a>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  import utils from '../../utils'
  import fixture from './fixture'

  export default {
    data() {
      return {
        "query": [],
        "size": 50,
        "search_results": fixture.data,
        // "search_results": [],
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
          {"q": this.query, "size": this.size},
          {},
          (result) => {
            this.search_results = JSON.parse(result).data;
            console.log(this.search_results);
            this.loading = false;
          },
          (result) => {
            this.error = "internal error";
            console.error(result);
            this.loading = false;
          }
        )
      }
    }
  }
</script>
<style scoped>
textarea {
  width:100%;
}
.textwrapper {
  border:1px solid #999999;
  margin:5px 0;
  padding:3px;
}
</style>
