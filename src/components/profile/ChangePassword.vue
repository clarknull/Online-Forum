<template>
   <q-card square>
    <q-toolbar class="bg-primary" >
        <p class='text-white'>Change Password</p>
        <q-space />
        <q-btn icon="fas fa-times" color="white" flat round v-close-popup />
    </q-toolbar>

      <q-form @submit.prevent="changePassword" ref="password">
        <q-card-section>
            <p> {{form.feedback}} </p>
            <q-input label="Old Password" :rules="[Rules.require]" :type="form.visible.old?'text':'password'" v-model="form.data.old" >
              <template v-slot:prepend>
                <q-icon color="primary" name="fas fa-lock" />
              </template>
              <template v-slot:append>
                <q-icon :name="`fas fa-${form.visible.old ? 'eye-slash' : 'eye'}`"
                  class="cursor-pointer" @click="form.visible.old = !form.visible.old" />
              </template>
            </q-input>
            <q-input label="New Password" :rules="[Rules.require]" :type="form.visible.new?'text':'password'" v-model="form.data.new" >
              <template v-slot:prepend>
                <q-icon color="primary" name="fas fa-lock" />
              </template>
              <template v-slot:append>
                <q-icon :name="`fas fa-${form.visible.new ? 'eye-slash' : 'eye'}`"
                  class="cursor-pointer" @click="form.visible.new = !form.visible.new" />
              </template>
            </q-input>
      </q-card-section>
      <q-card-actions class="q-mt-md" align="right">
        <q-btn type="submit" color="primary" :loading="form.loading" label="Change" />
      </q-card-actions>
    </q-form>
  </q-card>
</template>

<script>
export default {
  data () {
    return {
      form: {
        data: { old: '', new: '' },
        visible: { old: false, new: false },
        feedback: '',
        loading: false
      }
    }
  },
  methods: {
    async changePassword () {
      this.form.loading = true
      const response = await this.Controller.user.changePassword(this.form.data)
      this.form.loading = false
      if (response.status === 204) {
        this.$emit('success')
      } else {
        var error = this.Controller.parseError(response)
        this.$q.notify({ type: 'negative', message: error.details })
      }
    }
  }
}
</script>
