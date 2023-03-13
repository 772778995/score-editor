Vue.component('number-input', {
  props: {
    value: {
      type: Number,
      default: 0
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: Infinity
    },
    step: {
      type: Number,
      default: 1
    },
    precision: {
      type: Number,
      default: 0
    }
  },
  template: `
    <div class="rounded flex h-6" style="border: 1px solid #D9D9D9;">
      <input type="text" class="outline-none rounded flex-1 w-0 text-center" :value="displayValue" @input="updateValue($event.target.value, $event)" />
      <div class="flex flex-col h-full">
        <div
          class="flex-1 w-5 flex justify-center items-center cursor-pointer hover:bg-gray-200 duration-300"
          style="border-left: 1px solid #D9D9D9;"
          @click="increment"
        >
          <img src="/abc/img/arrow_down.png" class="transform -rotate-180" />
        </div>
        <div
          class="flex-1 w-5 flex justify-center items-center cursor-pointer hover:bg-gray-200 duration-300"
          style="border-top: 1px solid #D9D9D9;border-left: 1px solid #D9D9D9;"
          @click="decrement"
        >
          <img src="/abc/img/arrow_down.png" />
        </div>
      </div>
    </div>
  `,
  computed: {
    displayValue() {
      if (this.precision > 0) {
        return this.value.toFixed(this.precision);
      }
      return this.value.toString();
    }
  },
  methods: {
    increment() {
      const newValue = +this.value + +this.step;
      if (newValue <= this.max) {
        this.$emit('input', newValue);
      }
    },
    decrement() {
      const newValue = this.value - this.step;
      if (newValue >= this.min) {
        this.$emit('input', newValue);
      }
    },
    updateValue(newValue, e) {
      let parsedValue = parseFloat(newValue || this.min);
      if (isNaN(parsedValue)) {
        parsedValue = this.min;
      }
      if (parsedValue < this.min) {
        parsedValue = this.min;
      }
      if (parsedValue > this.max) {
        parsedValue = this.max;
      }
      if (!/^(0|[1-9]\d*)$/.test(newValue)) {
        e.target.value = this.displayValue;
      }
      this.$emit('input', parsedValue);
    }
  }
});