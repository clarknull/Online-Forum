<template>
  <q-layout view="lHh Lpr lFf">
    <q-header light class="light bg-white">
      <q-toolbar>
        <div v-if="$q.screen.lt.sm">
          <q-btn flat dense color="primary" round icon="fas fa-bars"  @click="model.drawer=true"/>
        </div>
        <q-toolbar-title @click="$router.push('/')" class="cursor-pointer q-pa-sm text-primary">
          <q-avatar square :size="$q.screen.lt.sm?'sm':'xl'">
            <q-img src="../assets/logo.png" alt="cn_forum_logo" />
          </q-avatar>
        </q-toolbar-title>
        <q-input label="Search forum....." >
          <template v-slot:prepend>
            <q-icon color='primary' size="16px" name="fas fa-search" />
          </template>
        </q-input>

          <q-avatar>
            <q-img v-if="isAuth" src="../assets/avatarS.png" />
            <q-icon v-else name="fas fa-user" color="primary" />
            <q-menu>
              <div v-if="isAuth">
                <q-list dense>
                  <q-item :to="`/${item.url}`" v-for="item in authLinks" :key="item.text">
                    <q-item-section avatar>
                      <q-icon size="16px" color="primary" :name="`fas fa-${item.icon}`" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label> {{item.text}} </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
                <q-btn class="full-width" @click="logout" label="Logout" color="primary" />
              </div>
              <div class="inline-block q-pa-none" v-else>
                <q-btn @click="showAuth(0)" flat label="Sign In" class='q-ma-xs full-width' outline color="secondary" />
                <q-btn @click="showAuth(1)" label="Join" class='q-ma-xs full-width'  color="secondary" />
              </div>
            </q-menu>
          </q-avatar>
      </q-toolbar>
    </q-header>

    <q-drawer class="lt-sm" behavior="mobile" v-model="model.drawer" >
      <q-toolbar>
        <q-space />
        <q-btn icon="fas fa-times" round flat color="primary" @click="model.drawer=false" />
      </q-toolbar>
      <nav-bar v-if="isAuth" />
      <q-list v-else>
        <q-item clickable @click="showAuth(0)">
          <q-item-section avatar>
            <q-icon name="fas fa-lock" />
          </q-item-section>
          <q-item-section>
            <q-item-label> Sign In </q-item-label>
          </q-item-section>
        </q-item>
        <q-btn @click="showAuth(1)" class="full-width" label="Join" color="primary" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <q-page>
        <div class="row">
          <div class="gt-xs col-12 col-sm-4 col-md-3 col-md-2">
            <nav-bar />
          </div>
          <div class="col-12 col-sm-8 col-md-9 col-lg-10">
            <router-view />
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

import NavBar from '../components/layout/Nav'

export default {
  name: 'MainLayout',

  data () {
    return {
      model: { drawer: false, create: false, dialog: false, auth: false },
      authState: 0,
      authLinks: [
        { text: 'Account', url: 'account', icon: 'user' },
        { text: 'Profile', url: 'profile', icon: 'user-edit' }
      ]
    }
  },

  computed: {
    isRootRoute () {
      return window.history.length > 1
    },
    isAuth () {
      return this.$store.getters.isAuth
    }
  },

  methods: {
    logout () {
      this.Controller.logout()
    },
    showAuth (type) {
      this.authState = type
      this.model.auth = true
    },
    authSuccess () {
      this.$q.notify({ type: 'positive', message: 'Login sucessfull' })
      this.model.auth = false
    }
  },

  components: { NavBar }
}
</script>

<style>
.bg-var {
   background: rgb(0,86,158);
background: -moz-radial-gradient(circle, rgba(0,86,158,1) 0%, rgba(43,158,255,0.7609243526512167) 100%);
background: -webkit-radial-gradient(circle, rgba(0,86,158,1) 0%, rgba(43,158,255,0.7609243526512167) 100%);
background: radial-gradient(circle, rgba(0,86,158,1) 0%, rgba(43,158,255,0.7609243526512167) 100%);
filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#00569e",endColorstr="#2b9eff",GradientType=1);
}
</style>
