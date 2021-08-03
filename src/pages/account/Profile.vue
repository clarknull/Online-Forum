<template>
  <q-page>
    <q-card flat square style="min-height: 160px" class="flex q-mb-lg items-end">
        <div class="row">
          <div class="col-12 col-md-8">
            <q-item>
            <q-item-section avatar top>
              <q-avatar size="96px">
                <q-img src="../../assets/avatarS.png" alt="user_avatar" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-h5 text-primary"> @{{$store.state.user.username}} </q-item-label>
              <q-item-label class="text-caption text-weight-light">
                <span class="q-ma-xs"> Joined: <b>2021</b> </span>
                <span class="q-ma-xs"> Status: <b class="text-green">online</b> </span>
              </q-item-label>
              <q-item-label class="text-subtitle1 q-py-sm"> i am clark null and i understand computers more than i understand people....</q-item-label>
              <q-item-label>
                <q-btn v-for="item in social" :key="item" :href="user[item]" :disable="user[item].length<=0" type="a" target='_blank'  flat size="xs" class="q-ma-none q-mr-sm " round :icon="`fab fa-${item}`" color="primary" />
              </q-item-label>
            </q-item-section>
            <q-item-section side top>
              <q-btn icon="fas fa-edit" round color="secondary" to="/profile" flat />
            </q-item-section>
          </q-item>
          </div>
          <div class="col-12 col-md-4 q-pa-md items-end flex" :class="[$q.screen.lt.md?'justify-between':'justify-end']" >
              <q-icon name="far fa-comment" size="32px" class="q-mx-md" color="accent" />
              <q-btn label="Follow" color="accent" />
          </div>
        </div>
    </q-card>
    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-4" :class="[$q.screen.lt.md?'order-none':'order-last']">
            <h5 class="q-ma-none q-mb-lg" >Interest  <q-btn size="sm" class="float-right" icon="fas fa-plus" round color="primary" /> </h5>
            <div>
              <q-chip v-for="item in interest" size="sm" :key="item" :label="item" square color="primary" text-color="white" />
            </div>
      </div>

      <div class="col-12 col-md-8">
        <div class="row q-col-gutter-xs">
          <div class="col-12" v-for="item in posts" :key="item.topic">
            <user-post :item='item' />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>

import UserPost from '../../components/post/User'

export default {
  data () {
    return {
      user: {},
      social: ['facebook', 'twitter', 'instagram', 'linkedin'],
      interest: ['python', 'art', 'food', 'beauty', 'nature', 'design', 'programming', 'mathematics', 'physics'],
      posts: [
        { topic: 'Programming can be fun', board: 'VueJs', text: 'this is just a dummy text, to write something meaningful is too stressful for me so......', date: '5 min ago', likes: 0, comments: 8 },
        { topic: 'Being a Nigerian...', board: 'General', text: 'this is just a dummy text, to write something meaningful is too stressful for me so......', date: 'an hour ago', likes: 6, comments: 0 }
      ]
    }
  },

  components: { UserPost },

  async mounted () {
    var user = await this.Controller.user.getProfile()
    console.log(user)
    this.user = user
  }
}
</script>
