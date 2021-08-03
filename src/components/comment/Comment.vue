<template>

      <q-item dense>
        <q-item-section avatar top>
          <q-avatar>
            <q-img src="../../assets/avatarS.png" alt="user_avatar" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label class="" > @{{item.user}}  </q-item-label>
          <q-item-label class="text-caption">
            <q-icon name="far fa-clock" />  {{item.date}}
          </q-item-label>
          <q-item-label class="text-subtitle1 text-weight-thin q-py-xs" > {{item.text}}  </q-item-label>
        </q-item-section>
      </q-item>

</template>

<script>

export default {
  data () {
    return {
      model: { visible: false }
    }
  },
  computed: {
    status () {
      return this.item.status > 1 ? 'Processing' : 'Validating'
    }
  },

  methods: {
    async deleteItem () {
      const response = await this.Controller.request.delete(this.item)
      if (response.status === 204) {
        this.$emit('deleted')
      } else {
        var error = this.Controller.parseError(response, 'request deleted sucessfully')
        this.$q.notify({ type: 'negative', message: error.message })
      }
    }
  },

  props: {
    item: {
      type: Object, default: () => {}
    }
  }
}
</script>
