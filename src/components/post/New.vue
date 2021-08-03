<template>
  <q-card square>
    <q-card-section class="q-pa-none">
      <q-item>
        <q-item-section>
          <q-item-label class="text-h6 "> <q-chip size="sm" text-color="white" :label="item.board" color="primary" square /> </q-item-label>
          <q-item-label class="text-h6"> {{item.topic}} </q-item-label>
          <div class="text-body2 q-pa-sm">
            <span class="q-ma-xs"> <q-icon name="far fa-clock" />  {{item.date}}  </span>
            <span class="q-ma-xs"> <q-icon name="far fa-comment-dots" />  {{item.comments}}  </span>
          </div>
        </q-item-section>
      </q-item>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  data () {
    return {
      model: { visible: false }
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
