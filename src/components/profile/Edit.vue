<template>
  <div class="row justify-center">
    <div class="col-11 col-sm-10 col-md-8">
      <q-toolbar>
        <q-btn  />
        <q-space />
      <q-chip label="Change Password"  color="primary" clickable icon="fas fa-lock" @click="model.password=true" />
      </q-toolbar>
      <q-form class="q-pa-md" @submit.prevent="onSubmit">
          <q-avatar size="96px">
              <q-img v-if="user.avatar" :src="user.avatar" />
              <q-icon name="person" v-else />
          </q-avatar>
          <div class="row q-col-gutter-sm">
              <div class="col-12">
                  <h6 class="q-ma-none"> Bio </h6>
                  <q-input type="textarea" label="Bio"  v-model="form.data.name" />
              </div>
              <div class="col col-12">
                  <h6 class="q-ma-none">Social media links</h6>
                  <q-input label="Facebook URL" v-model="form.data.facebook" />
                  <q-input label="Twitter URL" v-model="form.data.twitter" />
                  <q-input label="Instagram URL" v-model="form.data.instagram" />
                  <q-input label="Linkedin URL" v-model="form.data.linkedin" />
              </div>
              <q-btn type="submit" :loading="form.loading" color="primary"> Save </q-btn>
          </div>
      </q-form>
    </div>

   <q-dialog v-model="dialog.password">
      <change-password @success='notifySuccess' />
    </q-dialog>
  </div>
</template>

<script>

import ChangePassword from './ChangePassword'

export default {
  data () {
    return {
      form: {
        loading: false,
        data: { bio: '', facebook: '', twitter: '', instagram: '', linkedin: '' }
      },
      model: { password: false },
      user: { avatar: '' }
    }
  },
  computed: {
    // user () { return this.$store.getters.user }
  },

  components: { ChangePassword },

  methods: {
    async onSubmit () {
      this.form.control.loading = true
      const response = await this.Controller.user.updateProfile(this.form.data)
      this.form.control.loading = false
      if (response.status === 200) {
        this.$q.notify({ type: 'positive', message: 'Your profile has been updated' })
      } else {
        var error = this.Controller.parserError(response)
        this.$q.notify({ type: 'negative', message: error.message })
      }
    },
    notifySucess () {
      this.$q.notify({ type: 'positive', message: 'Password sucessfully changed' })
      this.dialog.password = false
    }
  }
}
</script>
