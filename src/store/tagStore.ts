import createId from '@/lib/createId';

const localStorageKeyName = 'tagList';

const tagStore = {
  tagList: [] as Tag[],
  fetchTags() {
    this.tagList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
    return this.tagList;
  },
  createTag(name: string) {
    const names = this.tagList.map(item => item.name);
    if (names.indexOf(name) < 0) {
      const id = createId().toString();
      this.tagList.push({id, name});
      this.saveTags();
      window.alert('创建成功！！！');
    }else{
      window.alert('标签名重复！！！');
      return 'duplicated';
    }
  },
  removeTag(id: string) {
    for (let i = 0; i < this.tagList.length; i++) {
      if (this.tagList[i].id === id) {
        this.tagList.splice(i, 1);
      }
    }
    this.saveTags();
    return true;
  },
  updateTag(id: string, name: string) {
    const idList = this.tagList.map(item => item.id);
    if (idList.indexOf(id) >= 0) {
      const names = this.tagList.map(item => item.name);
      if (names.indexOf(name) >= 0) {
        return 'duplicated';
      } else {
        const tag = this.tagList.filter(item => item.id === id)[0];
        tag.name = name;
        this.saveTags();
        return 'success';
      }
    }
    return 'not-found';
  },
  saveTags() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.tagList));
  }
};
tagStore.fetchTags();
export default tagStore;