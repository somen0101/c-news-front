<template>
    <v-container grid-list-md>
        <v-layout row wrap align-center justify-center fill-height>
            <v-flex xs12 sm8 lg5 md5>
                <v-card class="login-card">
                    <v-card-title>
                    <span class="headline">新規登録</span>
                    </v-card-title>

                    <v-spacer/>

                    <v-card-text>

                    <v-layout
                        row
                        fill-height
                        justify-center
                        align-center
                        v-if="loading"
                    >
                        <v-progress-circular
                        :size="50"
                        color="primary"
                        indeterminate
                        />
                    </v-layout>


                    <v-form v-else ref="form" v-model="valid" lazy-validation>
                        <v-container>

                        <v-text-field
                            v-model="credentials.username"
                            :counter="70"
                            label="ユーザーID"
                            :rules="rules.username"
                            maxlength="70"
                            required
                        />

                        <v-text-field
                            type="password"
                            v-model="credentials.password"
                            :counter="20"
                            label="パスワード"
                            :rules="rules.password"
                            maxlength="20"
                            required
                        />

                        </v-container>
                        <v-btn class="primary white--text" :disabled="!valid" @click="login">作成</v-btn>

                    </v-form>


                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import axios from 'axios';
import router from '../../router';
export default {
    name: 'Createuser',
    data: () => ({
        credentials: {"is_superuser": true},
        valid:true,
        loading:false,
        rules: {
        username: [
            v => !!v || "ユーザーIDは必須です",
            v => (v && v.length > 4) || "ユーザーIDは5文字以上でなければなりません",
            v => /^[a-z0-9_]+$/.test(v) || "許可されていない文字が入力されています"
        ],
        password: [
            v => !!v || "パスワードは必須です",
            v => (v && v.length > 4) || "ユーザーIDは5文字以上でなければなりません"
        ]
        }
    }),
    methods: {
        login() {
            if (this.$refs.form.validate()) {
            this.loading = true;
            axios.post('http://localhost:8000/api/create-users/', this.credentials)
                router.push('/');
        
            }
            }
        }
    
}
</script>