<template>
  <q-list :style="{'margin-top': $q.screen.lt.sm? '10px': '60px'}">
    <div class="q-px-md">
      <q-btn class="full-width q-mb-sm" color="accent" outline label="Give Feedback " @click="model.feedback=true" />
      <q-btn class="full-width" color="secondary" label="Start New Discussion " @click="model.create=true" />
    </div>
    <q-item :to="`/${item.url}`" v-for="item in userLink" :key="item.text">
      <q-item-section avatar>
        <q-icon :name="`fas fa-${item.icon}`" />
      </q-item-section>
      <q-item-section>
        <q-item-label> {{item.text}} </q-item-label>
      </q-item-section>
    </q-item>
    <q-separator inset spaced />
    <q-item :to="`${item.url}`" v-for="item in boardLink" :key="item.text">
      <q-item-section avatar>
        <q-icon :name="`fab fa-${item.icon}`" color="secondary" />
      </q-item-section>
      <q-item-section>
        <q-item-label> {{item.text}} </q-item-label>
      </q-item-section>
    </q-item>

    <q-dialog v-model="model.create" :maximized="$q.screen.lt.md">
      <create-post @created = 'topicCreated' />
    </q-dialog>

    <q-dialog v-model="model.feedback" :maximized="$q.screen.lt.sm">
      <create-feedback @created = 'feedbackCreated' />
    </q-dialog>

  </q-list>
</template>

<script>

import CreatePost from '../post/Create'
import CreateFeedback from '../feedback/Create'

export default {
  data () {
    return {
      model: { create: false, feedback: false },
      userLink: [
        { text: 'All Discussion', url: '', icon: 'comments' },
        { text: 'My Discussion', url: 'account', icon: 'star' }
      ],
      boardLink: [
        { text: 'General', url: '#', icon: 'stack-overflow' },
        { text: 'HTML', url: '#', icon: 'html5' },
        { text: 'Python', url: '#', icon: 'python' },
        { text: 'Javascript', url: '#', icon: 'js' },
        { text: 'React', url: '#', icon: 'react' },
        { text: 'Vue JS', url: '#', icon: 'vuejs' },
        { text: 'NodeJS', url: '#', icon: 'node-js' }
      ]
    }
  },

  methods: {
    topicCreated () {
      this.$q.notify({ type: 'positive', message: 'Topic Created Click to view' })
    },
    feedbackCreated () {
      this.$q.notify({ type: 'positive', message: 'Thank you for your feedback, it means the world to me.' })
    }
  },

  components: { CreatePost, CreateFeedback }
}
</script>
