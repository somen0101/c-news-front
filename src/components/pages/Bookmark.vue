<template>
  <div v-if="checktoken()" class="text-right">
    <v-btn small class="bm-btn" @click="bookmark">
      <v-icon>mdi-link</v-icon>
    </v-btn>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: {
    title: { type: String, require: true, default: '' },
    sentimental: { type: String, require: true, default: '' },
    author: { type: String, require: true, default: '' },
    publishedDate: { type: String, require: true, default: '' },
    description: { type: String, require: true, default: '' },
    imageUrl: { type: String, require: true, default: '' },
    topicUrl: { type: String, require: true, default: '' },
  },
  data() {
    return {
      isLike: false,
    }
  },
  methods: {
    bookmark() {
      const body = {
        username: this.$session.get('username'),
        title: this.title,
        description: this.description,
        published_date: this.publishedDate,
        author: this.author,
        topic_url: this.topicUrl,
        image_url: this.imageUrl,
        sentimental: this.sentimental,
      }
      axios.post('http://localhost:8000/api/bookmark/', body)
    },
    checktoken() {
      if (this.$session.has('token')) {
        return true
      } else {
        return false
      }
    },
  },
}
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
