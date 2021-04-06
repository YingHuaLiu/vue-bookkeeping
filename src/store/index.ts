import Vue from 'vue'
import Vuex from 'vuex'
import createId from '@/lib/createId'

Vue.use(Vuex)

type RootState = {
  recordList: RecordItem[];
}

const store = new Vuex.Store({
  state: {
    recordList: []
  } as RootState,
  mutations: {
    fetchRecord(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]')
    },
    saveRecord(state) {
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList))
    },
    createRecord(state, record: RecordItem) {
      const record2 = JSON.parse(JSON.stringify(record))
      state.recordList?.push(record2)
      store.commit('saveRecord')
    },
    deleteRecord(state, id: number) {
      for (let i = 0; i < state.recordList.length; i++) {
        if (state.recordList[i].id === id) {
          state.recordList.splice(i, 1);
        }
      }
      store.commit('saveRecord')
    }
  }
})

export default store
