"use strict";
const uni_modules_JerryCalendar_components_JerryCalendar_constant_Lunar = require("./constant/Lunar.js");
const uni_modules_JerryCalendar_components_JerryCalendar_constant_ChineseEra = require("./constant/ChineseEra.js");
const uni_modules_JerryCalendar_components_JerryCalendar_constant_ChineseZodiac = require("./constant/ChineseZodiac.js");
const uni_modules_JerryCalendar_components_JerryCalendar_constant_Festival = require("./constant/Festival.js");
const uni_modules_JerryCalendar_components_JerryCalendar_constant_SolarTerm = require("./constant/SolarTerm.js");
const uni_modules_JerryCalendar_components_JerryCalendar_constant_Salutation = require("./constant/Salutation.js");
const calendar = {
  /**
   * 农历1900-2100的润大小信息表
   * @Array Of Property
   * @return Hex
   */
  lunarInfo: uni_modules_JerryCalendar_components_JerryCalendar_constant_Lunar.lunarInfo,
  /**
   * 公历每个月份的天数普通表
   * @Array Of Property
   * @return Number
   */
  solarMonth: uni_modules_JerryCalendar_components_JerryCalendar_constant_Lunar.solarMonth,
  /**
   * 天干地支之天干速查表
   * @Array Of Property trans["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"]
   * @return Cn string
   */
  Gan: uni_modules_JerryCalendar_components_JerryCalendar_constant_ChineseEra.Gan,
  /**
   * 天干地支之地支速查表
   * @Array Of Property
   * @trans["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"]
   * @return Cn string
   */
  Zhi: uni_modules_JerryCalendar_components_JerryCalendar_constant_ChineseEra.Zhi,
  /**
   * 天干地支之地支速查表<=>生肖
   * @Array Of Property
   * @trans["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"]
   * @return Cn string
   */
  Animals: uni_modules_JerryCalendar_components_JerryCalendar_constant_ChineseZodiac.ChineseZodiac,
  /**
   * 阳历节日
   */
  festival: uni_modules_JerryCalendar_components_JerryCalendar_constant_Festival.festival,
  /**
   * 农历节日
   */
  lFestival: uni_modules_JerryCalendar_components_JerryCalendar_constant_Festival.lFestival,
  /**
   * 24节气速查表
   * @Array Of Property
   * @trans["小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至"]
   * @return Cn string
   */
  solarTerm: uni_modules_JerryCalendar_components_JerryCalendar_constant_SolarTerm.solarTerm,
  /**
   * 1900-2100各年的24节气日期速查表
   * @Array Of Property
   * @return 0x string For splice
   */
  sTermInfo: uni_modules_JerryCalendar_components_JerryCalendar_constant_SolarTerm.sTermInfo,
  /**
   * 数字转中文速查表
   * @Array Of Property
   * @trans ['日','一','二','三','四','五','六','七','八','九','十']
   * @return Cn string
   */
  nStr1: uni_modules_JerryCalendar_components_JerryCalendar_constant_Salutation.nStr1,
  /**
   * 日期转农历称呼速查表
   * @Array Of Property
   * @trans ['初','十','廿','卅']
   * @return Cn string
   */
  nStr2: uni_modules_JerryCalendar_components_JerryCalendar_constant_Salutation.nStr2,
  /**
   * 月份转农历称呼速查表
   * @Array Of Property
   * @trans ['正','一','二','三','四','五','六','七','八','九','十','冬','腊']
   * @return Cn string
   */
  nStr3: uni_modules_JerryCalendar_components_JerryCalendar_constant_Salutation.nStr3,
  /**
   * 返回默认定义的阳历节日
   */
  getFestival() {
    return this.festival;
  },
  /**
   * 返回默认定义的内容里节日
   */
  getLunarFestival() {
    return this.lFestival;
  },
  /**
   *
   * @param param {Object} 按照festival的格式输入数据，设置阳历节日
   */
  setFestival(param = {}) {
    this.festival = param;
  },
  /**
   *
   * @param param {Object} 按照lFestival的格式输入数据，设置农历节日
   */
  setLunarFestival(param = {}) {
    this.lFestival = param;
  },
  /**
   * 返回农历y年一整年的总天数
   * @param y lunar Year
   * @return Number
   * @eg:var count = calendar.lYearDays(1987) ;//count=387
   */
  lYearDays: function(y) {
    let i, sum = 348;
    for (i = 32768; i > 8; i >>= 1) {
      sum += this.lunarInfo[y - 1900] & i ? 1 : 0;
    }
    return sum + this.leapDays(y);
  },
  /**
   * 返回农历y年闰月是哪个月；若y年没有闰月 则返回0
   * @param y lunar Year
   * @return Number (0-12)
   * @eg:var leapMonth = calendar.leapMonth(1987) ;//leapMonth=6
   */
  leapMonth: function(y) {
    return this.lunarInfo[y - 1900] & 15;
  },
  /**
   * 返回农历y年闰月的天数 若该年没有闰月则返回0
   * @param y lunar Year
   * @return Number (0、29、30)
   * @eg:var leapMonthDay = calendar.leapDays(1987) ;//leapMonthDay=29
   */
  leapDays: function(y) {
    if (this.leapMonth(y)) {
      return this.lunarInfo[y - 1900] & 65536 ? 30 : 29;
    }
    return 0;
  },
  /**
   * 返回农历y年m月（非闰月）的总天数，计算m为闰月时的天数请使用leapDays方法
   * @param y lunar Year
   * @param m lunar Month
   * @return Number (-1、29、30)
   * @eg:var MonthDay = calendar.monthDays(1987,9) ;//MonthDay=29
   */
  monthDays: function(y, m) {
    if (m > 12 || m < 1) {
      return -1;
    }
    return this.lunarInfo[y - 1900] & 65536 >> m ? 30 : 29;
  },
  /**
   * 返回公历(!)y年m月的天数
   * @param y solar Year
   * @param m solar Month
   * @return Number (-1、28、29、30、31)
   * @eg:var solarMonthDay = calendar.leapDays(1987) ;//solarMonthDay=30
   */
  solarDays: function(y, m) {
    if (m > 12 || m < 1) {
      return -1;
    }
    const ms = m - 1;
    if (ms === 1) {
      return y % 4 === 0 && y % 100 !== 0 || y % 400 === 0 ? 29 : 28;
    } else {
      return this.solarMonth[ms];
    }
  },
  /**
   * 农历年份转换为干支纪年
   * @param  lYear 农历年的年份数
   * @return Cn string
   */
  toGanZhiYear: function(lYear) {
    var ganKey = (lYear - 3) % 10;
    var zhiKey = (lYear - 3) % 12;
    if (ganKey === 0)
      ganKey = 10;
    if (zhiKey === 0)
      zhiKey = 12;
    return this.Gan[ganKey - 1] + this.Zhi[zhiKey - 1];
  },
  /**
   * 公历月、日判断所属星座
   * @param  cMonth [description]
   * @param  cDay [description]
   * @return Cn string
   */
  toAstro: function(cMonth, cDay) {
    const s = "摩羯水瓶双鱼白羊金牛双子巨蟹狮子处女天秤天蝎射手摩羯";
    const arr = [20, 19, 21, 21, 21, 22, 23, 23, 23, 23, 22, 22];
    return s.substr(cMonth * 2 - (cDay < arr[cMonth - 1] ? 2 : 0), 2) + "座";
  },
  /**
   * 传入offset偏移量返回干支
   * @param offset 相对甲子的偏移量
   * @return Cn string
   */
  toGanZhi: function(offset) {
    return this.Gan[offset % 10] + this.Zhi[offset % 12];
  },
  /**
   * 传入公历(!)y年获得该年第n个节气的公历日期
   * @param y y公历年(1900-2100)
   * @param n n二十四节气中的第几个节气(1~24)；从n=1(小寒)算起
   * @return day Number
   * @eg:var _24 = calendar.getTerm(1987,3) ;//_24=4;意即1987年2月4日立春
   */
  getTerm: function(y, n) {
    if (y < 1900 || y > 2100 || n < 1 || n > 24) {
      return -1;
    }
    const _table = this.sTermInfo[y - 1900];
    const _calcDay = [];
    for (let index = 0; index < _table.length; index += 5) {
      const chunk = parseInt("0x" + _table.substr(index, 5)).toString();
      _calcDay.push(
        chunk[0],
        chunk.substr(1, 2),
        chunk[3],
        chunk.substr(4, 2)
      );
    }
    return parseInt(_calcDay[n - 1]);
  },
  /**
   * 传入农历数字月份返回汉语通俗表示法
   * @param m lunar month
   * @return Cn string
   * @eg:var cnMonth = calendar.toChinaMonth(12) ;//cnMonth='腊月'
   */
  toChinaMonth: function(m) {
    if (m > 12 || m < 1) {
      return -1;
    }
    let s = this.nStr3[m - 1];
    s += "月";
    return s;
  },
  /**
   * 传入农历日期数字返回汉字表示法
   * @param d lunar day
   * @return Cn string
   * @eg:var cnDay = calendar.toChinaDay(21) ;//cnMonth='廿一'
   */
  toChinaDay: function(d) {
    let s;
    switch (d) {
      case 10:
        s = "初十";
        break;
      case 20:
        s = "二十";
        break;
      case 30:
        s = "三十";
        break;
      default:
        s = this.nStr2[Math.floor(d / 10)];
        s += this.nStr1[d % 10];
    }
    return s;
  },
  /**
   * 年份转生肖[!仅能大致转换] => 精确划分生肖分界线是“立春”
   * @param y year
   * @return Cn string
   * @eg:var animal = calendar.getAnimal(1987) ;//animal='兔'
   */
  getAnimal: function(y) {
    return this.Animals[(y - 4) % 12];
  },
  /**
   * 传入阳历年月日获得详细的公历、农历object信息 <=>JSON
   * !important! 公历参数区间1900.1.31~2100.12.31
   * @param yPara  solar year
   * @param mPara  solar month
   * @param dPara  solar day
   * @return JSON object
   * @eg:console.log(calendar.solar2lunar(1987,11,01));
   */
  solar2lunar: function(yPara, mPara, dPara) {
    let y = parseInt(yPara);
    let m = parseInt(mPara);
    let d = parseInt(dPara);
    if (y < 1900 || y > 2100) {
      return -1;
    }
    if (y === 1900 && m === 1 && d < 31) {
      return -1;
    }
    let objDate;
    if (!y) {
      objDate = /* @__PURE__ */ new Date();
    } else {
      objDate = new Date(y, parseInt(m) - 1, d);
    }
    let i, leap = 0, temp = 0;
    y = objDate.getFullYear();
    m = objDate.getMonth() + 1;
    d = objDate.getDate();
    let offset = (Date.UTC(objDate.getFullYear(), objDate.getMonth(), objDate.getDate()) - Date.UTC(1900, 0, 31)) / 864e5;
    for (i = 1900; i < 2101 && offset > 0; i++) {
      temp = this.lYearDays(i);
      offset -= temp;
    }
    if (offset < 0) {
      offset += temp;
      i--;
    }
    let isTodayObj = /* @__PURE__ */ new Date(), isToday = false;
    if (isTodayObj.getFullYear() === y && isTodayObj.getMonth() + 1 === m && isTodayObj.getDate() === d) {
      isToday = true;
    }
    let nWeek = objDate.getDay(), cWeek = this.nStr1[nWeek];
    if (nWeek === 0) {
      nWeek = 7;
    }
    const year = i;
    leap = this.leapMonth(i);
    let isLeap = false;
    for (i = 1; i < 13 && offset > 0; i++) {
      if (leap > 0 && i === leap + 1 && isLeap === false) {
        --i;
        isLeap = true;
        temp = this.leapDays(year);
      } else {
        temp = this.monthDays(year, i);
      }
      if (isLeap === true && i === leap + 1) {
        isLeap = false;
      }
      offset -= temp;
    }
    if (offset === 0 && leap > 0 && i === leap + 1) {
      if (isLeap) {
        isLeap = false;
      } else {
        isLeap = true;
        --i;
      }
    }
    if (offset < 0) {
      offset += temp;
      --i;
    }
    const month = i;
    const day = offset + 1;
    const sm = m - 1;
    const gzY = this.toGanZhiYear(year);
    const firstNode = this.getTerm(y, m * 2 - 1);
    const secondNode = this.getTerm(y, m * 2);
    let gzM = this.toGanZhi((y - 1900) * 12 + m + 11);
    if (d >= firstNode) {
      gzM = this.toGanZhi((y - 1900) * 12 + m + 12);
    }
    let isTerm = false;
    let Term = null;
    if (firstNode === d) {
      isTerm = true;
      Term = this.solarTerm[m * 2 - 2];
    }
    if (secondNode === d) {
      isTerm = true;
      Term = this.solarTerm[m * 2 - 1];
    }
    const dayCyclical = Date.UTC(y, sm, 1, 0, 0, 0, 0) / 864e5 + 25567 + 10;
    const gzD = this.toGanZhi(dayCyclical + d - 1);
    const astro = this.toAstro(m, d);
    const solarDate = y + "-" + m + "-" + d;
    const lunarDate = year + "-" + month + "-" + day;
    const festival = this.festival;
    const lFestival = this.lFestival;
    const festivalDate = m + "-" + d;
    let lunarFestivalDate = month + "-" + day;
    if (month === 12 && day === 29 && this.monthDays(year, month) === 29) {
      lunarFestivalDate = "12-30";
    }
    return {
      date: solarDate,
      lunarDate,
      festival: festival[festivalDate] ? festival[festivalDate].title : null,
      lunarFestival: lFestival[lunarFestivalDate] ? lFestival[lunarFestivalDate].title : null,
      "lYear": year,
      "lMonth": month,
      "lDay": day,
      "Animal": this.getAnimal(year),
      "IMonthCn": (isLeap ? "闰" : "") + this.toChinaMonth(month),
      "IDayCn": this.toChinaDay(day),
      "cYear": y,
      "cMonth": m,
      "cDay": d,
      "gzYear": gzY,
      "gzMonth": gzM,
      "gzDay": gzD,
      "isToday": isToday,
      "isLeap": isLeap,
      "nWeek": nWeek,
      "ncWeek": "星期" + cWeek,
      "isTerm": isTerm,
      "Term": Term,
      "astro": astro
    };
  },
  /**
   * 传入农历年月日以及传入的月份是否闰月获得详细的公历、农历object信息 <=>JSON
   * !important! 参数区间1900.1.31~2100.12.1
   * @param y  lunar year
   * @param m  lunar month
   * @param d  lunar day
   * @param isLeapMonth  lunar month is leap or not.[如果是农历闰月第四个参数赋值true即可]
   * @return JSON object
   * @eg:console.log(calendar.lunar2solar(1987,9,10));
   */
  lunar2solar: function(y, m, d, isLeapMonth) {
    y = parseInt(y);
    m = parseInt(m);
    d = parseInt(d);
    isLeapMonth = !!isLeapMonth;
    const leapMonth = this.leapMonth(y);
    this.leapDays(y);
    if (isLeapMonth && leapMonth !== m) {
      return -1;
    }
    if (y === 2100 && m === 12 && d > 1 || y === 1900 && m === 1 && d < 31) {
      return -1;
    }
    const day = this.monthDays(y, m);
    let _day = day;
    if (isLeapMonth) {
      _day = this.leapDays(y, m);
    }
    if (y < 1900 || y > 2100 || d > _day) {
      return -1;
    }
    let offset = 0;
    let i;
    for (i = 1900; i < y; i++) {
      offset += this.lYearDays(i);
    }
    let leap = 0, isAdd = false;
    for (i = 1; i < m; i++) {
      leap = this.leapMonth(y);
      if (!isAdd) {
        if (leap <= i && leap > 0) {
          offset += this.leapDays(y);
          isAdd = true;
        }
      }
      offset += this.monthDays(y, i);
    }
    if (isLeapMonth) {
      offset += day;
    }
    const strap = Date.UTC(1900, 1, 30, 0, 0, 0);
    const calObj = new Date((offset + d - 31) * 864e5 + strap);
    const cY = calObj.getUTCFullYear();
    const cM = calObj.getUTCMonth() + 1;
    const cD = calObj.getUTCDate();
    return this.solar2lunar(cY, cM, cD);
  }
};
exports.calendar = calendar;
