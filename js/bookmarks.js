const app = new Vue({
  el: "#app",
  data() {
    return {
      filterText: '',
      data: [],
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    }
  },
  created() {
    this.init()
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  methods: {
    init() {
      chrome.bookmarks.getTree((bookmarks) => {
        this.data = [...bookmarks[0].children]
      })
    },
    filterNode(value, data) {
      if (value.length === 0) this.collapseAll()
      if (!value) return true;
      return data.title.indexOf(value) !== -1;
    },
    treeSkipClick(v) {
      window.open(v)
    },
    // 全部折叠
    collapseAll() {
      // 将没有转换成树的原数据
      let list = this.data;
      for (let i = 0; i < list.length; i++) {
        this.$refs.tree.store.nodesMap[list[i].id].expanded = false
      }
    },
    openSelect() {
      const checkedNodes = this.$refs.tree.getCheckedNodes().filter(item => !!item.url)
      if (checkedNodes.length > 0 && checkedNodes.length <= 10) {
        this.$refs.tree.getCheckedNodes().forEach(v => {
          if (v.url) {
            chrome.tabs.create({
              url: v.url
            })
          }
        });
      } else if (checkedNodes.length > 10) {
        alert('书签一次最多打开10个')
      } else if (checkedNodes.length === 0) {
        alert('打开书签0')
      }
    },
  }
})