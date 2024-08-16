import store from 'store'

export const set = (key, value) => {
    store.set(key, value)
}

export const get = (key, value) => {
    store.get(key, value)
}

export const remove = (key) => {
    store.remove(key)
}

export const clearAll = () => {
    store.clearAll()
}

const webStorage = {
    set,
    get,
    remove,
    clearAll,
}

export default webStorage
