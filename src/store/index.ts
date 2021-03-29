import Vue from 'vue'
import Vuex from 'vuex'
import clone from '@/lib/clone'
import createId from '@/lib/createId'

Vue.use(Vuex)

type rootState = {
  recordList: RecordItem[];
  tagList: Tag[];
  currentTag?: Tag;
}
const store = new Vuex.Store({
  state: {
    recordList: [],
    tagList: [],
    currentTag: undefined
  } as rootState,
  mutations: {
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]')
    },
    saveRecords(state) {
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList))
    },
    createRecord(state, record: RecordItem) {
      const record2 = clone(record)
      record2.createdAt = new Date().toISOString()
      state.recordList?.push(record2)
      store.commit('saveRecords')
    },

    fetchTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]')
    },
    createTag(state, name: string) {
      const names = state.tagList.map(item => item.name)
      if (names.indexOf(name) < 0) {
        const id = createId().toString()
        state.tagList.push({id, name})
        store.commit('saveTags')
        window.alert('创建成功！！！')
      } else {
        window.alert('标签名重复！！！')
        return 'duplicated'
      }
    },
    saveTags(state) {
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList))
    },
    setCurrentTag(state, id: string) {
      state.currentTag = state.tagList.filter(item => item.id === id)[0]
    },
    updateTag(state, payload: { id: string; name: string }) {
      const {id, name} = payload
      const idList = state.tagList.map(item => item.id)
      if (idList.indexOf(id) >= 0) {
        const names = state.tagList.map(item => item.name)
        if (names.indexOf(name) >= 0) {
          window.alert('标签名重复了！')
        } else {
          const tag = state.tagList.filter(item => item.id === id)[0]
          tag.name = name
          store.commit('saveTags')
        }
      }
    },
    removeTag(state, id: string) {
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          state.tagList.splice(i, 1)
        }
      }
      store.commit('saveTags')
    },
  }
})

export default store
