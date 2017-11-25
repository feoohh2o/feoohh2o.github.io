<template>
  <span>
    <form>
      <label for="query">Query:</label>
      <input type="text" name="query" v-model="query"/>
      <label for="size">Size:</label>
      <input type="number" name="size" v-model="size" value="50"/>
      <input type="submit" value="Search" @click.prevent="on_click"/>
    </form>
    <p v-show="loading">Loading...</p>
    <p v-show="error">{{error}}</p>
    <div>
      <ul>
        <li v-for="row in search_results">
          <p>
            <a :href="`https://www.reddit.com/u/${row['author']}`">
              {{row["author"]}}
            </a>
            <a :href="`https://www.reddit.com${row['permalink']}`">
              commented
            </a>
            in <a :href="`https://www.reddit.com/r/${row['subreddit']}`">{{row['subreddit']}}</a>
          </p>
          <p>

          </p>
          <div class="textwrapper">
            <textarea rows="6" cols="100">{{row['body'].trim()}}</textarea>
          </div>
        </li>
      </ul>
    </div>
  </span>
</template>
<script>
import utils from '../../utils'

  export default {
    data() {
      return {
        "query": [],
        "size": 50,
        "search_results": "",
        "error": "",
        "loading": false
      }
    },
    methods: {
      on_click() {
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
