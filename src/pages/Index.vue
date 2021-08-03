<template>
  <q-page class="flex flex-center q-px-sm q-py-md">
    <div class="row q-col-gutter-sm ">
      <div class="col-12 col-md-4 col-lg-2" :class="[$q.screen.lt.md?'order-none':'order-last']">
        <h5 class="text-primary q-ma-sm"> New </h5>
        <div class="row q-col-gutter-sm">
          <div class="col-12" v-for="(item, index) in threads" :key="index">
            <new-post :item='item' />
          </div>
        </div>
      </div>
      <div class="col-12 col-md-8 col-lg-10">
        <div class="row" :class="[$q.screen.lt.md?'justify-end':'justify-start']">
          <div class="col-5 col-sm-4 col-md-2 col-lg-2 col-xl-1 q-mt-sm">
            <q-select outlined dense options-dense :options="sortOptions" v-model="filter.sort" />
          </div>
        </div>
        <div class="col-12 " v-for="(item, index) in threads" :key="index">
          <home-post :item='item' />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>

import HomePost from '../components/post/Home'
import NewPost from '../components/post/New'

export default {
  name: 'PageIndex',
  data () {
    return {
      sortOptions: ['Latest', 'Oldest', 'Popular'],
      filter: {
        sort: 'Latest'
      },
      threads: [
        { topic: 'Programming can be fun', board: 'VueJs', text: 'this is just a dummy text, to write something meaningful is too stressful for me so......', date: '5 min ago', likes: 0, comments: 8 },
        { topic: 'Being a Nigerian...', board: 'General', text: 'this is just a dummy text, to write something meaningful is too stressful for me so......', date: 'an hour ago', likes: 6, comments: 0 }
      ]
    }
  },
  components: { HomePost, NewPost }
}
</script>
