"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_Jerry_Calendar2 = common_vendor.resolveComponent("Jerry-Calendar");
  _easycom_Jerry_Calendar2();
}
const _easycom_Jerry_Calendar = () => "../../uni_modules/Jerry-Calendar/components/Jerry-Calendar/Jerry-Calendar.js";
if (!Math) {
  _easycom_Jerry_Calendar();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const activeDate = common_vendor.ref("2023-01-01");
    const selectData = (e) => {
      console.log(e);
      activeDate.value = e.date;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(selectData),
        b: common_vendor.p({
          activeDate: activeDate.value
        })
      };
    };
  }
};
wx.createPage(_sfc_main);
