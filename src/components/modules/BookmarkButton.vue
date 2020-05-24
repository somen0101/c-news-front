<template>
  <div v-if="checktoken()" class="text-right" @click="bookmark">
    <fasBook v-if="bookmarked" />
    <farBook v-if="!bookmarked" />
  </div>
</template>

<script>
import axios from 'axios'
import fasBook from '../modules/FasBook'
import farBook from '../modules/FarBook'

export default {
  components: {
    fasBook,
    farBook,
  },
  props: {
    title: { type: String, require: true, default: '' },
    sentimental: { type: String, require: true, default: '' },
    author: { type: String, require: true, default: '' },
    publishedDate: { type: String, require: true, default: '' },
    description: { type: String, require: true, default: '' },
    imageUrl: { type: String, require: true, default: '' },
    topicUrl: { type: String, require: true, default: '' },
    bookmarkId: { type: String, require: true, default: undefined },
  },
  data() {
    return {
      bookmarked: false,
    }
  },
  created() {
    if (this.bookmarkId) this.bookmarked = true
  },
  methods: {
    bookmark() {
      if (this.bookmarked) this.deleteBookmark()
      else this.registerBookmark()
    },
    registerBookmark() {
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
      axios.post('http://localhost:8000/api/bookmark/', body).then(() => {
        this.bookmarked = true
      })
    },
    deleteBookmark() {
      axios
        .delete(
          `http://localhost:8000/api/bookmark/${this.$session.get(
            'username'
          )}/${this.bookmarkId}`
        )
        .then(() => {
          this.bookmarked = false
        })
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
