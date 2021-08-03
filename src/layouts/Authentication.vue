<template>
  <q-layout view="lHh Lpr lFf">

    <q-page-container>
      <q-toolbar class="bg-red">
        <q-icon @click="model=!model" name="fas fa-list" />
        <q-toolbar-title> Test </q-toolbar-title>
      </q-toolbar>
      <q-drawer v-model="model">
        <q-list>
          <q-item v-for="item in allFood" :key="item">
            <q-item-section>
              <q-item-label> {{item}} </q-item-label>
            </q-item-section>
            <q-item-section>
              <q-btn icon="fa fa-times" @click="allFood.pop()" />
            </q-item-section>
          </q-item>
        </q-list>
      </q-drawer>
      <q-input v-model="food" />
      <q-btn label="add" color="primary" @click="allFood.push(food)" />
      <q-page class="fit flex flex-center ">
        <div class="col ">
          <div  class="row justify-center">
            <div class="col-11 col-sm-8 col-md-6 col-lg-4">
              <q-card v-if="current === 0" class="fit" flat>
                <q-card-section>
                  <h3 class="q-ma-sm"> Login </h3>
                  <q-separator style="width: 100px; height: 3px" color="primary" inset />
                </q-card-section>
                  <q-form ref="login" @submit.prevent="login">
                    <q-card-section>
                        <q-input dense label="Username"  :rules="[Rules.require]" type="text" v-model="form.login.data.username">
                          <template v-slot:prepend>
                            <q-icon color='primary' name="fas fa-user" />
                          </template>
                        </q-input>
                        <q-input dense label="Password" :type="form.login.visible?'text':'password'" :rules="[Rules.require]"   v-model="form.login.data.password" >
                          <template v-slot:prepend>
                            <q-icon color='primary' name="fas fa-lock" />
                          </template>
                          <template v-slot:append>
                            <q-icon
                              :name="`fas fa-${form.login.visible ? 'eye-slash' : 'eye'}`"
                              class="cursor-pointer"
                              @click="form.login.visible = !form.login.visible"
                              />
                          </template>
                        </q-input>
                      <p class="text-center text-red text-capitalized"> {{form.login.error}} </p>
                    </q-card-section>

                    <q-card-actions align="between">
                      <p class="q-mr-sm text-primary"><a > Forgot password?</a></p>
                      <q-btn type="submit" :loading="form.login.loading" label="Sign In" color="primary" />
                    </q-card-actions>

                    <q-card-section>
                      <p class="q-mr-sm text-center">Don't have an account? <a class="text-primary" @click.prevent="current = 1"> Sign Up</a></p>
                    </q-card-section>
                  </q-form>
              </q-card>

              <q-card v-else flat >
                <q-card-section>
                  <h3 class="q-ma-sm"> Join </h3>
                  <q-separator style="width: 100px; height: 3px" color="primary" inset />
                </q-card-section>
                  <q-form ref="register" @submit.prevent="signUp">
                    <q-card-section>
                      <div class="row items-center q-col-gutter-sm justify-between">
                        <q-input :rules="[Rules.require]" class="col-12" label="Full Name" v-model="form.signUp.data.full_name">
                          <template v-slot:prepend>
                            <q-icon color='primary' name="fas fa-user" />
                          </template>
                        </q-input>
                        <q-input :error-message="form.signUp.error.message.username" :error='!!form.signUp.error.message.username' :rules="[Rules.require]" class="col-12 " label="Username" type="text" v-model="form.signUp.data.username">
                          <template v-slot:prepend>
                            <q-icon color='primary' name="fas fa-user" />
                          </template>
                        </q-input>
                        <q-input :rules="[Rules.require]" label="Password" class="col-12" :type="form.signUp.visible?'text':'password'" v-model="form.signUp.data.password" >
                          <template v-slot:prepend>
                            <q-icon color='primary' name="fas fa-lock" />
                          </template>
                          <template v-slot:append>
                            <q-icon
                              :name="`fas fa-${form.signUp.visible ? 'eye-slash' : 'eye'}`"
                              class="cursor-pointer"
                              @click="form.signUp.visible = !form.signUp.visible"
                            />
                          </template>
                        </q-input>
                      <p> {{ form.signUp.error.details }} </p>
                      </div>
                    </q-card-section>
                    <q-card-actions align="between">
                      <p class="q-mr-sm">Have an account? <a class="text-primary" @click.prevent="current = 0"> Sign In</a></p>
                      <q-btn type="submit" :loading="form.loading" label="Join" color="primary" />
                    </q-card-actions>
                  </q-form>
              </q-card>
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>

    <q-footer>
      <div class="bg-primary text-white">
          <p class="q-ma-xs"> Developed for all by @clarknull &copy; All right reserved 2020 </p>
        </div>
    </q-footer>

  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      current: 0,
      model: false,
      allFood: [],
      food: '',
      form: {
        login: {
          loading: false,
          visible: false,
          error: '',
          data: { username: '', password: '' }
        },
        signUp: {
          loading: false,
          visible: false,
          error: { message: '' },
          data: { username: '', password: '' }
        }
      }
    }
  },
  methods: {
    async login () {
      if (this.$refs.login.validate()) {
        this.form.login.error = ''
        this.form.login.loading = true
        const response = await this.Controller.user.login(this.form.login.data)
        this.form.login.loading = false
        if (response.status !== 200) {
          const error = this.Controller.parseError(response)
          this.form.login.error = error.details
        } else {
          this.Controller.login()
          this.auth()
        }
      }
    },

    async signUp () {
      if (this.$refs.register.validate()) {
        this.form.signUp.error = { message: { } }
        this.form.signUp.loading = true
        const response = await this.Controller.user.register(this.form.signUp.data)
        if (response.status !== 200) {
          const error = this.Controller.parseError(response)
          this.form.signUp.error = error
        } else {
          this.Controller.login()
          this.auth()
        }
        this.form.signUp.loading = false
      }
    },

    auth () {
      this.$store.commit('updateUser')
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
body {
  font-family: 'Barlow', Courier, monospace !important
}
h3 {
  font-family: 'Barlow', Tahoma, Geneva, Verdana, sans-serif ;
}
</style>
