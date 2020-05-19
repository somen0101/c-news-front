<template>
  <v-row justify="center">
    <v-col cols="12" align="center">
      <h2 class="mb-1 news-category">{{ page_title }}</h2>
      <v-divider class="mb-3" />
      <v-card v-for="news in info" :key="news.title" outlined hover class="mb-3">
        <v-container class="pt-3 pb-0">
          <a :href="news.topic_url" target="_brank" rel="noopener">
            <v-row>
              <v-col class="text-left py-1 pb-0" cols="8">
                <h3 class="mb-2" icon>
                  <v-icon v-if="emotion_num(news.sentimental) > 0.4">mdi-emoticon-excited-outline</v-icon>
                  <v-icon
                    v-else-if="emotion_num(news.sentimental) > -0.3"
                  >mdi-emoticon-neutral-outline</v-icon>
                  <v-icon v-else>mdi-emoticon-sad</v-icon>
                  {{ news.title }}
                </h3>
                <p class="mb-0 text-right">
                  <span class="mr-2">{{ news.author }}</span>
                  <time>{{ getFormtedDate(news.published_date) }}</time>
                </p>
                <v-card-text class="news-text pl-1 py-2">{{ getNewsText(news.description) }}</v-card-text>
              </v-col>
              <v-col class="px-5" cols="4">
                <v-img
                  :src="getImageUrl(news.image_url)"
                  :height="$vuetify.breakpoint.smAndUp ? 150 : 90"
                  style="border-radius: 6px;"
                />
              </v-col>
            </v-row>
          </a>
          <Bookmark
            :title="news.title"
            :sentimental="news.sentimental"
            :author="news.author"
            :published_date="getFormtedDate(news.published_date)"
            :description="getNewsText(news.description)"
            :image_url="news.image_url"
            :topic_url="news.topic_url"
          ></Bookmark>
        </v-container>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs";
import Bookmark from "./Bookmark.vue";

export default {
  name: "index",
  components: {
    Bookmark
  },
  data() {
    return {
      domain_tags: [],
      page_path: [],
      page_title: "国内トップニュース",
      info: [],
      credit: [],
      username: null
    };
  },
  watch: {
    $route(to){
      this.domain_tags = to.params.domain_tags;
      this.page_path = to.path;
      if (this.page_path === "/") {
        axios
          .get(
            "http://localhost:8000/api/newstopics/?domain_tags=jp&top_news=top"
          )
          .then(response => (this.info = response.data));
        this.page_title = "国内トップニュース";
      } else if (this.page_path === "/news/jp") {
        axios
          .get("http://localhost:8000/api/newstopics/?domain_tags=jp")
          .then(response => (this.info = response.data));
        this.page_title = "国内記事";
      } else if (this.page_path === "/news/us") {
        axios
          .get("http://localhost:8000/api/newstopics/?domain_tags=us")
          .then(response => (this.info = response.data));
        this.page_title = "アメリカ";
      } else if (this.page_path === "/news/gb") {
        axios
          .get("http://localhost:8000/api/newstopics/?domain_tags=gb")
          .then(response => (this.info = response.data));
        this.page_title = "イギリス";
      } else if (this.page_path === "/news/kr") {
        axios
          .get("http://localhost:8000/api/newstopics/?domain_tags=kr")
          .then(response => (this.info = response.data));
        this.page_title = "韓国";
      } else if (this.page_path === "/news/fr") {
        axios
          .get("http://localhost:8000/api/newstopics/?domain_tags=fr")
          .then(response => (this.info = response.data));
        this.page_title = "フランス";
      } else if (this.page_path === "/news/it") {
        axios
          .get("http://localhost:8000/api/newstopics/?domain_tags=it")
          .then(response => (this.info = response.data));
        this.page_title = "イタリア";
      } else if (this.page_path === "/news/de") {
        axios
          .get("http://localhost:8000/api/newstopics/?domain_tags=de")
          .then(response => (this.info = response.data));
        this.page_title = "ドイツ";
      } else if (
        this.page_path ===
        "/bookmark/" + this.$session.get("username")
      ) {
        axios
          .get(
            "http://localhost:8000/api/bookmark/?username=" +
              this.$session.get("username")
          )
          .then(response => (this.info = response.data));
        this.page_title = "あなたのブックマーク";
      }
    }
  },
  mounted() {
    this.domain_tags = this.$route.params.domain_tags;
    this.page_path = this.$route.path;
    if (this.page_path === "/") {
      axios
        .get(
          "http://localhost:8000/api/newstopics/?domain_tags=jp&top_news=top"
        )
        .then(response => (this.info = response.data));
    } else if (this.page_path === "/news/jp") {
      axios
        .get("http://localhost:8000/api/newstopics/?domain_tags=jp")
        .then(response => (this.info = response.data));
    } else if (this.page_path === "/news/us") {
      axios
        .get("http://localhost:8000/api/newstopics/?domain_tags=us")
        .then(response => (this.info = response.data));
    } else if (this.page_path === "/news/gb") {
      axios
        .get("http://localhost:8000/api/newstopics/?domain_tags=gb")
        .then(response => (this.info = response.data));
    } else if (this.page_path === "/news/kr") {
      axios
        .get("http://localhost:8000/api/newstopics/?domain_tags=kr")
        .then(response => (this.info = response.data));
    } else if (this.page_path === "/news/fr") {
      axios
        .get("http://localhost:8000/api/newstopics/?domain_tags=fr")
        .then(response => (this.info = response.data));
    } else if (this.page_path === "/news/it") {
      axios
        .get("http://localhost:8000/api/newstopics/?domain_tags=it")
        .then(response => (this.info = response.data));
    } else if (this.page_path === "/news/de") {
      axios
        .get("http://localhost:8000/api/newstopics/?domain_tags=de")
        .then(response => (this.info = response.data));
    } else if (this.page_path === "/bookmark/" + this.$session.get("username")) {
      axios
        .get(
          "http://localhost:8000/api/bookmark/?username=" +
            this.$session.get("username")
        )
        .then(response => (this.info = response.data));
    }
  },
  methods: {
    checktoken() {
      if (this.$session.has("token")) {
        return true;
      } else {
        return false;
      }
    },
    getFormtedDate(date) {
       if (this.page_path === "/bookmark/" + this.$session.get("username") ){
        return date;
      } else {
        return dayjs(date).format("M/DD HH:mm");
      }
    },
    getImageUrl(imageUrl) {
      if (imageUrl !== null && imageUrl.match(/^https?:\/\//)) {
        return imageUrl;
      } else {
        return require("@/assets/img/noimage.jpg");
      }
    },
    getNewsText(text) {
      if (text){
        const limitedText = text.substr(0, 120);
        if (limitedText.slice(-3) === "...") {
          return limitedText;
        }
        return limitedText + "...";
      } else return "本文はありません。"
    },
    emotion_num(num) {
      return Number(num);
    }
  }
};
</script>

<style lang="scss" scoped>
.news-category {
  color: #616161;
  @media screen and (max-width: 600px) {
    font-size: 20px;
  }
}
.news-title {
  font-size: 17px;
  color: #616161;
  @media screen and (max-width: 600px) {
    font-size: 13px;
  }
}
.news-author {
  font-size: 11.5px;
  color: #757575;
}
.news-text {
  font-size: 12px;
  color: #757575;
}
a {
  text-decoration: none;
}
</style>
