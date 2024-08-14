"use strict";
const uni_modules_JerryCalendar_components_JerryCalendar_calendar = require("./calendar.js");
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  props: {
    activeDate: { type: String, default: "" }
  },
  data() {
    return {
      current: 1,
      currentDate: uni_modules_JerryCalendar_components_JerryCalendar_calendar.calendar.solar2lunar(),
      scrollLeft: 20,
      init: true,
      scrollViewWidth: 0
    };
  },
  computed: {
    weeks() {
      let beferWeeks = [], currentWeeks = [], afterWeeks = [];
      const index = (this.current - 1) * 7;
      for (let i = index - 7; i < index; i++) {
        beferWeeks.push(this.getCurrentDateAfterDay(i));
      }
      for (let i = index; i < index + 7; i++) {
        currentWeeks.push(this.getCurrentDateAfterDay(i));
      }
      for (let i = index + 7; i < index + 14; i++) {
        afterWeeks.push(this.getCurrentDateAfterDay(i));
      }
      return [beferWeeks, currentWeeks, afterWeeks];
    }
  },
  methods: {
    init() {
      this.current = 1;
      this.scrollLeft = this.scrollViewWidth - this.scrollViewWidth / 7 * 3;
    },
    // 获取当前日期后N天后的日期
    getCurrentDateAfterDay(n = 0) {
      const newDate = /* @__PURE__ */ new Date();
      newDate.setDate(newDate.getDate() + n);
      let year = newDate.getFullYear();
      let month = newDate.getMonth() + 1;
      let day = newDate.getDate();
      return uni_modules_JerryCalendar_components_JerryCalendar_calendar.calendar.solar2lunar(year, month, day);
    },
    scroll(e) {
      const { scrollLeft, scrollWidth } = e.detail;
      if (this.init) {
        this.scrollViewWidth = scrollWidth / 3;
        this.scrollLeft = this.scrollViewWidth - this.scrollViewWidth / 7 * 3;
        this.init = false;
        return;
      }
      if (scrollLeft < 100) {
        this.scrollLeft = scrollLeft + this.scrollViewWidth;
        this.current = this.current - 1;
      } else if (scrollLeft > this.scrollViewWidth * 2 - 100) {
        this.scrollLeft = scrollLeft - this.scrollViewWidth;
        this.current = this.current + 1;
      }
    },
    clickItem(item) {
      this.$emit("selectData", item);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($options.weeks, (week, ind, i0) => {
      return {
        a: common_vendor.f(week, (item, index, i1) => {
          return {
            a: common_vendor.t(`${item.ncWeek}`),
            b: common_vendor.t(`${item.cMonth}-${item.cDay}`),
            c: common_vendor.t(`${item.IMonthCn}${item.IDayCn}`),
            d: index,
            e: item.date && item.date === $data.currentDate.date ? 1 : "",
            f: item.date && item.date === $props.activeDate ? 1 : "",
            g: common_vendor.o(($event) => $options.clickItem(item), index)
          };
        }),
        b: ind
      };
    }),
    b: common_vendor.o((...args) => $options.scroll && $options.scroll(...args)),
    c: $data.scrollLeft
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-71d29e00"]]);
wx.createComponent(Component);
