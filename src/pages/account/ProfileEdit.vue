<template>
  <div class="row">
    <div class="col-11 col-sm-10 col-md-8">
      <q-toolbar>
        <q-space />
      <q-chip label="Change Password"  color="secondary" size="md" text-color="white" clickable icon="fas fa-lock" @click="model.password=true" />
      </q-toolbar>
      <q-form class="q-pa-md" @submit.prevent="onSubmit">
          <div class="row q-col-gutter-lg">
              <div class="col-12 text-center">
                <q-avatar color="primary" size="96px">
                    <q-img v-if="user.avatar" :src="user.avatar" />
                    <q-icon color="white" name="fas fa-user" v-else />
                </q-avatar>
              </div>
              <div class="col-12">
                  <q-input :error-message="form.error.message.full_name" :error='!!form.error.message.full_name'  autogrow label="Full Name"  v-model="form.data.full_name">
                    <template v-slot:prepend>
                      <q-icon color="primary" name="fas fa-user" />
                    </template>
                  </q-input>
              </div>
              <div class="col-12">
                  <q-input type="textarea" :error-message="form.error.message.bio" :error='!!form.error.message.bio' autogrow label="Bio"  v-model="form.data.bio">
                    <template v-slot:prepend>
                      <q-icon color="primary" name="fas fa-comment-alt" />
                    </template>
                  </q-input>
              </div>
                <div class="col-12 col-sm-6">
                  <q-input dense label="Facebook URL" :error-message="form.error.message.facebook" :error='!!form.error.message.facebook' v-model="form.data.facebook">
                    <template v-slot:prepend>
                      <q-icon color="primary" name="fab fa-facebook" />
                    </template>
                  </q-input>
                </div>
                <div class="col-12 col-sm-6">
                  <q-input dense label="Twitter URL" :error-message="form.error.message.twitter" :error='!!form.error.message.twitter' v-model="form.data.twitter" >
                    <template v-slot:prepend>
                      <q-icon color="primary" name="fab fa-twitter" />
                    </template>
                  </q-input>
                </div>
                <div class="col-12 col-sm-6">
                  <q-input dense label="Instagram URL" :error-message="form.error.message.instagram" :error='!!form.error.message.instagram' v-model="form.data.instagram" >
                    <template v-slot:prepend>
                      <q-icon color="primary" name="fab fa-instagram" />
                    </template>
                  </q-input>
                </div>
                <div class="col-12 col-sm-6">
                  <q-input dense label="Linkedin URL" :error-message="form.error.message.linkedin" :error='!!form.error.message.linkedin' v-model="form.data.linkedin" >
                    <template v-slot:prepend>
                      <q-icon color="primary" name="fab fa-linkedin" />
                    </template>
                  </q-input>
                </div>
              <div class="col-12">

              <q-btn type="submit" :loading="form.loading" label="Save" color="primary" />
              </div>
          </div>
      </q-form>
    </div>

   <q-dialog v-model="model.password">
      <change-password @success='notifySuccess' />
    </q-dialog>
  </div>
</template>

<script>

import ChangePassword from '../../components/profile/ChangePassword'

export default {
  data () {
    return {
      form: {
        loading: false,
        data: { full_name: '', bio: '', facebook: '', twitter: '', instagram: '', linkedin: '' },
        error: { message: {} }
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
      this.form.loading = true
      for (const key in this.form.data) {
        if (this.form.data[key].length <= 0) { delete this.form.data[key] }
      }
      this.form.error = { message: {} }
      const response = await this.Controller.user.updateProfile(this.form.data)
      this.form.loading = false
      if (response.status === 200) {
        this.$q.notify({ type: 'positive', message: 'Your profile has been updated' })
      } else {
        var error = this.Controller.parseError(response)
        this.form.error = error
        // this.$q.notify({ type: 'negative', message: error.details })
      }
    },

    notifySuccess () {
      this.$q.notify({ type: 'positive', message: 'Password sucessfully changed' })
      this.model.password = false
    }
  },

  async mounted () {
    var user = await this.Controller.user.getProfile()
    this.user = user
    this.form.data = user
  }
}
</script>
