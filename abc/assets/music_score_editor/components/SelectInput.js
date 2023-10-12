Vue.component("select-input", {
  props: {
    value: {
      type: String,
    },
    list: {
      type: Array,
      required: true,
    },
    width: {
      type: String,
    },
  },
  data() {
    return {
      showList: false,
    };
  },
  template: `
    <div
      class="rounded flex items-center relative cursor-pointer pl-3 w-auto pr-2 _border duration-300"
      :class="{ 'active': showList }"
      :style="width?'width:'+width:''"
      @click.stop="showList = !showList"
    >
      <div v-if="list.find(item => (item.val?item.val:item.txt) === value)?.txt" class="flex-1">
        {{ list.find(item => (item.val?item.val:item.txt) === value)?.txt }}
      </div>
      <img v-else-if="list.find(item => item.val === value)?.img" class="flex-1" :src="list.find(item => item.val === value)?.img"/>
      <div v-else class="flex-1"></div>
      <img src="assets/music_score_editor/img/arrow_down.png" style="width: 12px; height: 6px;" class="ml-2 transform duration-300" :class="{
        'rotate-180': showList
      }" />

      <div
        class="h-32 left-0 overflow-y-auto transform top-full absolute duration-300 bg-white rounded z-50" :class="showList ? '_show' : '_hide'"
        style="padding: 1px; box-shadow: 4px 4px 24px 0px rgba(0,22,41,0.14); transform: translateY(1px);"
      >
        <div
          v-for="item in list"
          :key="item.txt"
          class="rounded-sm px-2 py-1 hover:sky-blue-bg duration-300"
          style="min-width: 50px;"
          :style="width?'width:'+width:''"
          @click="updateValue(item.val?item.val:item.txt)"
        >
          <div v-if="item.txt">{{ item.txt }}</div>
          <img v-else-if="item.img" :src="item.img" />
        </div>
      </div>
    </div>
  `,
  mounted() {
    document.addEventListener("click", () => {
      this.showList = false;
    });
  },
  methods: {
    updateValue(newValue) {
      console.log(newValue);
      this.$emit("input", newValue);
    },
  },
});
