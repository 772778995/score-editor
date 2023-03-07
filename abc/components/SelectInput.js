Vue.component('select-input', {
  props: {
    value: {
      type: String
    },
    list: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      showList: false
    }
  },
  template: `
    <div
      class="rounded z-50 flex items-center relative cursor-pointer pl-3 w-auto pr-2 _border duration-300"
      :class="{ 'active': showList }"
      @click.stop="showList = !showList"
    >
      <div class="flex-1">
        {{ list.find(item => item.val === value)?.txt }}
      </div>

      <img src="/abc/img/arrow_down.png" style="width: 12px; height: 6px;" class="transform duration-300" :class="{
        'rotate-180': showList
      }" />

      <div
        class="h-32 left-0 overflow-y-auto transform top-full absolute duration-300 bg-white rounded" :class="showList ? '_show' : '_hide'"
        style="padding: 1px; box-shadow: 4px 4px 24px 0px rgba(0,22,41,0.14); transform: translateY(1px);"
      >
        <div
          v-for="item in list"
          :key="item.txt"
          class="rounded-sm px-2 py-1 hover:sky-blue-bg duration-300"
          @click="updateValue(item.val)"
        >
          <div>{{ item.txt }}</div>
        </div>
      </div>
    </div>
  `,
  mounted() {
    document.addEventListener('click', () => {
      this.showList = false;
    });
  },
  methods: {
    updateValue(newValue) {
      this.$emit('input', newValue);
    }
  }
});