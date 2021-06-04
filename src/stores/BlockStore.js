import { observable, action, computed } from 'mobx'
import { TYPE_USER } from '../constants/blockedStore'

const STORAGE_KEY = 'blockedList'

class BlockStore {
  @observable blockedList = this.getFromLocalStorage()

  @action
  addToList(type, id) {
    const key = this.generateKey(type, id)
    this.blockedList[key] = { id, type, createdAt: new Date().getTime() }
    this.updateLocalStorage()
  }

  @action
  deleteFromList(type, id) {
    const key = this.generateKey(type, id)
    delete this.blockedList[key]
    this.updateLocalStorage()
  }

  @computed
  get userIds() {
    const ids = []
    for(let key in this.blockedList) {
      if (this.blockedList[key].type === TYPE_USER) {
        ids.push(this.blockedList[key].id)
      }
    }

    return ids
  }

  generateKey(type, id) {
    return  `${type}$${id}`
  }

  getFromLocalStorage() {
    const storageData = localStorage.getItem(STORAGE_KEY)
    
    return storageData ? JSON.parse(storageData) : {}
  }

  updateLocalStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.blockedList))
  }
}

export default BlockStore