<template>
  <q-card flat square>
    <q-card-section>
      <q-item>
        <q-item-section avatar top>
          <q-avatar>
            <q-img src="../../assets/avatarS.png" alt="user_avatar" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-h6"> {{item.topic}} <q-chip :label="item.board" text-color="white" size="sm" color="secondary" square /> </q-item-label>
          <q-item-label class="text-subtitle1 text-weight-thin" > {{item.text}}  </q-item-label>
          <div class="text-body2 q-pa-sm">
            <span class="q-ma-sm"> <q-icon name="far fa-clock" />  {{item.date}}  </span>
            <span class="q-ma-sm"> <q-icon name="far fa-thumbs-up" />  {{item.likes}}  </span>
            <span class="q-ma-sm"> <q-icon name="far fa-comment-dots" />  {{item.comments}}  </span>
          </div>
          <div class="q-pa-sm">
            <q-input dense label="Comment">
              <template v-slot:before>
                <q-avatar size="sm">
                  <q-img src="../../assets/avatarS.png" alt="user_avatar" />
                </q-avatar>
              </template>
              <template v-slot:after>
                <q-icon size="16px" name="fas fa-play" color="primary" />
              </template>
            </q-input>
            <div class="q-pa-sm">
              <comment v-for="i in 2" :key="i" :item="comment" />
            </div>
          </div>
        </q-item-section>
      </q-item>
    </q-card-section>
  </q-card>
</template>

<script>
import Comment from '../comment/Comment'

export default {
  data () {
    return {
      model: { visible: false },
      comment: { user: this.$store.state.user.username, text: 'this is just a dummy text, to write something meaningful is too stressful for me so......', date: '5 min ago', likes: 0 }

    }
  },
  computed: {
    status () {
      return this.item.status > 1 ? 'Processing' : 'Validating'
    }
  },

  components: { Comment },

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
