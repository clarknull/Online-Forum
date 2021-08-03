<template>
  <q-card flat square>
    <q-card-section>
      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <q-img src="../../assets/avatarS.png" alt="user_avatar" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-h6 "> {{item.topic}} <q-chip size="sm" text-color="white" :label="item.board" color="secondary" square /> </q-item-label>
          <q-item-label class="text-caption text-weight-thin" >
            <span><q-icon name="fas fa-reply" /> latest reply <a href="#"> @ {{$store.state.username}}  s</a> </span>
            <span class="q-mx-sm"> <q-icon name="far fa-clock" />  {{item.date}}  </span>
          </q-item-label>
          <q-item-label class="text-subtitle1 text-weight-light q-mt-sm" > {{item.text}}  </q-item-label>
          <div class="text-body2 q-pa-sm">
            <span class="q-ma-sm"> <q-icon name="far fa-clock" />  {{item.date}}  </span>
            <span class="q-ma-sm"> <q-icon name="far fa-comment-dots" />  {{item.comments}}  </span>
          </div>
        </q-item-section>
      </q-item>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'HomePost',
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
