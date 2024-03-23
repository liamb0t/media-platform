import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', {
  state: () => ({
    showModal: false,
    filePath: null,
    fileType: null,
    isLoaded: false,
  }),
  actions: {
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    setFileName(filePath) {
      this.filePath = filePath;
    },
    setLoaded(value) {
      this.isLoaded = value;
    },
  },
})
