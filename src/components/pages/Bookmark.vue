
<template>
  <div class="text-right" v-if="checktoken()">
    <v-btn small class="bm-btn" @click="bookmark">
      <v-icon>mdi-link</v-icon>
    </v-btn>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: [
    "title",
    "sentimental",
    "author",
    "published_date",
    "description",
    "image_url",
    "topic_url"
  ],
  data() {
    return {
      isLike: false
    };
  },
  methods: {
    bookmark() {
      const body = {
        username: this.$session.get("username"),
        title: this.title,
        description: this.description,
        published_date: this.published_date,
        author: this.author,
        topic_url: this.topic_url,
        image_url: this.image_url,
        sentimental: this.sentimental
      };
      axios.post("http://localhost:8000/api/bookmark/", body);
    },
    checktoken() {
      if (this.$session.has("token")) {
        return true;
      } else {
        return false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.bm-btn {
  opacity: 0.4;
  &:hover {
    transition: all 0.2s ease;
    opacity: 1;
  }
}
</style>
