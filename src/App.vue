<template>
  <v-app>
    <v-app-bar class="header-bar" flat dark dense fixed app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" aria-label="drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>コロナニュースまとめ</v-toolbar-title>
<!--      
      <v-spacer></v-spacer>
      <div v-if="checkusername()">
      ようこそ
      <router-link :to="{ name: 'bookmark', params: { username: username } }">
       {{ username }}
      </router-link>
      さん
      </div>
      <div v-else>
        <v-btn text
      to="/auth">
        ログイン
      </v-btn>
      <v-btn text
      to="/createuser">
       新規登録
      </v-btn>
      </div>
-->      
    </v-app-bar>
     <v-navigation-drawer
    v-model="drawer"
    app
    clipped
    floating
  >
    <v-list shaped dense class="py-5">

      <v-list-item
      exact
      router-link :to="{ name:'index' }"
      >
      <v-list-item-icon>
          <v-icon>mdi-fire</v-icon>
        </v-list-item-icon> 
        <v-list-item-title>国内トップニュース</v-list-item-title>
      </v-list-item>

      <v-list-item
      exact
      router-link :to="{ name:'news', params: { domain_tags: 'jp' }}"
      >
      <v-list-item-icon>
          <v-icon>mdi-newspaper-variant-multiple-outline</v-icon>
        </v-list-item-icon> 
        <v-list-item-title>国内記事</v-list-item-title>  
      </v-list-item>

      <v-divider class="my-1" />

      <v-list-group no-action>
        <template v-slot:activator>
          <v-list-item-icon>
            <v-icon>mdi-earth</v-icon>
          </v-list-item-icon>
          <v-list-item-title>ワールド(翻訳)</v-list-item-title>
        </template>
        <v-list-item
          :to="{ name: 'news', params: { domain_tags: 'us' } }"
          exact
        ><flag iso="us" class="text-left" />
          <v-list-item-title>アメリカ</v-list-item-title>
        </v-list-item>
        <v-list-item
          :to="{ name: 'news', params: { domain_tags: 'gb' } }"
          exact
        ><flag iso="gb" class="text-left" />
          <v-list-item-title>イギリス</v-list-item-title>
        </v-list-item>
        <v-list-item
          :to="{ name: 'news', params: { domain_tags: 'kr' } }"
          exact
        ><flag iso="kr" class="text-left" />
          <v-list-item-title>韓国</v-list-item-title>
        </v-list-item>
        <v-list-item
          :to="{ name: 'news', params: { domain_tags: 'fr' } }"
          exact
        ><flag iso="fr" class="text-left" />
          <v-list-item-title>フランス</v-list-item-title>
        </v-list-item>
        <v-list-item
          :to="{ name: 'news', params: { domain_tags: 'it' } }"
          exact
        ><flag iso="it" class="text-left" />
          <v-list-item-title>イタリア</v-list-item-title>
        </v-list-item>
        <v-list-item
          :to="{ name: 'news', params: { domain_tags: 'de' } }"
          exact
        ><flag iso="de" class="text-left" />
          <v-list-item-title>ドイツ</v-list-item-title>
        </v-list-item>
      </v-list-group>
    </v-list>
    <v-divider/>
    <v-list-item>
      <v-list-item-content class="subtitle-1">このサイトの記事には感情解析が用いられています。</v-list-item-content>
    </v-list-item>
    <v-list-item>
      <v-list-item-content class="caption">感情解析結果(-1.0から1.0の感情数値)に応じてどんな内容の記事かが一目でわかります。</v-list-item-content>
    </v-list-item>
    <v-list-item>
      <v-list-item-icon>
            <v-icon>mdi-emoticon-excited-outline</v-icon>
          </v-list-item-icon>
      <v-list-item-content class="caption">感情数値 0.5以上</v-list-item-content>
    </v-list-item>
    <v-list-item>
      <v-list-item-icon>
            <v-icon>mdi-emoticon-neutral-outline</v-icon>
          </v-list-item-icon>
      <v-list-item-content class="caption">感情数値 -0.2 ~ 0.4</v-list-item-content>
    </v-list-item>
    <v-list-item>
      <v-list-item-icon>
            <v-icon>mdi-emoticon-sad</v-icon>
          </v-list-item-icon>
      <v-list-item-content class="caption">感情数値 -0.3以下</v-list-item-content>
    </v-list-item>  
<!--
    <v-divider/>
    <template v-slot:append>
      <div class="pa-3 text-center">
        <v-divider />

        <v-btn v-if="checktoken()"
        round
        shape
        block
        @click="logout">ログアウト</v-btn>

        <v-btn v-else
        to="/auth"
        round
        shape
        block
        color="primary"
        > 
        ログイン
        </v-btn>
      </div>
    </template>
-->    
  </v-navigation-drawer>
  <v-content>
    <router-view></router-view>
  </v-content>  
  </v-app>
</template>

<script>
import router from './router'
import axios from 'axios';
export default {
        name: 'app',
         data () {
    return {
      info: [],
      username: null,
      drawer: true,
    }
  },
  methods: {
        logout() {
            if (this.$session.has("token")) {
            this.loading = true;
            this.$session.destroy();
            this.drawer = false;
            router.push('/');
            }
          },
        checktoken() {
        if (this.$session.has("token")) {
          return true
        }else{
          return false
        }
      },
        checkusername() {
          if (this.$session.has("username")) {
              this.username=this.$session.get("username");
          return true
        }else{
          return false
        }
      },
  },  
  mounted () {
        axios.get('http://localhost:8000/api/users/')
             .then(response => this.info = response.data)
  }
};
</script>