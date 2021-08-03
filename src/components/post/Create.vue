<template>
  <q-card  :style="{'min-width':$q.screen.lt.sm?'100%':'400px' }">
    <q-form ref="create" @submit.prevent="submit">
      <q-toolbar class="bg-primary">
        <p class="text-h5 text-white"> Start A Discussion </p>
        <q-space />
        <q-btn flat color="white" round icon="fas fa-times" v-close-popup />
      </q-toolbar>
      <q-card-section>
        <div class="q-mt-sm">
          <q-input counter maxlength="64" label="Title"
              :rules="[Rules.require,(v)=> Rules.maxLength(v,160)]" v-model="form.data.title" >
            <template v-slot:before>
              <q-icon color='primary' name="fas fa-comment" />
            </template>
          </q-input>
        </div>
        <div class="q-mt-md">
          <q-input type="textarea" counter maxlength="255"
              :rules="[Rules.require,(v)=> Rules.maxLength(v,255)]" v-model="form.data.text" label="Description">
            <template v-slot:before>
              <q-icon color='primary' name="fas fa-comments" />
            </template>
          </q-input>
        </div>
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
      form: { data: { text: '', have: '' }, loading: false }
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
        const response = await this.Controller.request.add(this.form.data)
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
