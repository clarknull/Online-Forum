<template>
  <div class="row" >
    <div class="col-12 col-sm-10 col-md-8">
      <h3 class="q-my-sm"> {{item.topic}} </h3>
      <p class="text-subtitle2 text-weight-light ">
        <span> <q-icon name="fas fa-user" /> @{{$store.state.username}} </span>
        <span class="q-mx-sm" > <q-icon name="fas fa-clock" /> {{item.date}} </span>
      </p>

      <p> {{item.text}} </p>

      <p>
        <span> <q-icon name="fas fa-thumbs-up" /> {{item.likes}} </span>
        <span class="q-mx-sm"> <q-icon name="fas fa-reply" /> {{item.comments}} </span>
      </p>

      <div class="q-mt-sm">
        <q-input label="Reply" v-model="form.data.comment" >
          <template v-slot:before>
            <q-avatar size="sm">
              <q-img src="../assets/avatarS.png" alt="user_avatar" />
            </q-avatar>
          </template>
          <template v-slot:after>
            <q-icon name="fas fa-play" color="primary" />
          </template>
        </q-input>
      </div>

      <div class="q-ma-md">
        <single-post v-for="item in posts" :item='item'  :key="item.board" />
      </div>
    </div>
  </div>
</template>

<script>

import SinglePost from '../components/post/User'

export default {
  data () {
    return {
      form: {
        data: { comment: '' }
      },
      social: [{ icon: 'facebook' }, { icon: 'twitter' }, { icon: 'instagram' }],
      interest: ['python', 'art', 'food', 'beauty', 'nature', 'design', 'programming', 'mathematics', 'physics'],
      posts: [
        { topic: 'Programming can be fun', board: 'VueJs', text: 'this is just a dummy text, to write something meaningful is too stressful for me so......', date: '5 min ago', likes: 0, comments: 8 },
        { topic: 'Being a Nigerian...', board: 'General', text: 'this is just a dummy text, to write something meaningful is too stressful for me so......', date: 'an hour ago', likes: 6, comments: 0 }
      ]
    }
  },

  computed: {
    item () { return this.posts[1] }
  },

  components: { SinglePost }
}
</script>
