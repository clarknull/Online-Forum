<template>
  <q-card  :style="{'min-width':$q.screen.lt.sm?'100%':'400px' }">
    <q-form ref="create" @submit.prevent="submit">
      <q-toolbar class="bg-primary">
        <p class="text-h5 text-white"> Start A Discussion </p>
        <q-space />
        <q-btn flat color="white" round icon="fas fa-times" v-close-popup />
      </q-toolbar>

      <q-card-section class="bg-primary text-white">
        <p> Tell me what you love, tell me what you hate, or just tell me what you think could make this forum better.</p>
        <p> i'm just a guy learning to build by trying to build, so your opinion means the world to me. </p>
      </q-card-section>

      <q-card-section >
          <q-input type="textarea" counter maxlength="160"
              :rules="[Rules.require,(v)=> Rules.maxLength(v,160)]" v-model="form.data.text" label="Message">
            <template v-slot:prepend>
              <q-icon color='primary' name="fas fa-comment" />
            </template>
          </q-input>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn label="Post" :loading="form.loading" color="primary" type="submit" />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script>

export default {
  data () {
    return {
      form: { data: { text: '' }, loading: false }
    }
  },
  computed: {
    auth () {
      return this.$store.getters.isAuth
    }
  },
  methods: {
    async submit () {
      if (this.$refs.create.validate()) {
        this.form.loading = true
        const response = await this.Controller.feedback.add(this.form.data)
        this.form.loading = false
        if (response.status === 201) {
          this.$refs.create.reset()
          this.$emit('created', response.data)
        } else {
          var error = this.Controller.parseError(response, 'request added sucessfully')
          this.$q.notify({ type: 'negative', message: error.message })
        }
      }
    }
  }

}
</script>
