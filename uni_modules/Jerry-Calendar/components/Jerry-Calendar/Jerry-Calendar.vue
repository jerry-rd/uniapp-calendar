<template>
	<scroll-view ref="scrollView" scroll-anchoring :scroll-with-animation="false" class="scroll-view" scroll-x="true" @scroll="scroll" :scroll-left="scrollLeft">
		<view class="view-cantainer" ref="cantainerRef">
			<view class="view-flex" v-for="(week, ind) in weeks" :key="ind">
				<view
					v-for="(item, index) in week"
					:key="index"
					class="item"
					:class="{
						isToday: item.date && item.date === currentDate.date,
						isActive: item.date && item.date === activeDate
					}"
					@click="clickItem(item)"
				>
					<view class="week-text">{{ `${item.ncWeek}` }}</view>
					<view class="day-text">{{ `${item.cMonth}-${item.cDay}` }}</view>
					<view class="lunar-text">{{ `${item.IMonthCn}${item.IDayCn}` }}</view>
				</view>
			</view>
		</view>
	</scroll-view>
</template>
<script>
import calendar from './calendar.js'
export default {
	props: {
		activeDate: { type: String, default: '' }
	},
	data() {
		return {
			current: 1,
			currentDate: calendar.solar2lunar(),
			scrollLeft: 20,
			init: true,
			scrollViewWidth: 0
		}
	},
	computed: {
		weeks() {
			let beferWeeks = [],
				currentWeeks = [],
				afterWeeks = []
			const index = (this.current - 1) * 7
			for (let i = index - 7; i < index; i++) {
				beferWeeks.push(this.getCurrentDateAfterDay(i))
			}
			for (let i = index; i < index + 7; i++) {
				currentWeeks.push(this.getCurrentDateAfterDay(i))
			}
			for (let i = index + 7; i < index + 14; i++) {
				afterWeeks.push(this.getCurrentDateAfterDay(i))
			}
			return [beferWeeks, currentWeeks, afterWeeks]
		}
	},
	methods: {
		init() {
			this.current = 1
			this.scrollLeft = this.scrollViewWidth - (this.scrollViewWidth / 7) * 3
		},
		// 获取当前日期后N天后的日期
		getCurrentDateAfterDay(n = 0) {
			const newDate = new Date()
			newDate.setDate(newDate.getDate() + n)
			let year = newDate.getFullYear()
			let month = newDate.getMonth() + 1
			let day = newDate.getDate()
			return calendar.solar2lunar(year, month, day)
		},
		scroll(e) {
			const { scrollLeft, scrollWidth } = e.detail
			if (this.init) {
				this.scrollViewWidth = scrollWidth / 3
				this.scrollLeft = this.scrollViewWidth - (this.scrollViewWidth / 7) * 3
				this.init = false
				return
			}
			if (scrollLeft < 100) {
				this.scrollLeft = scrollLeft + this.scrollViewWidth
				this.current = this.current - 1
			} else if (scrollLeft > this.scrollViewWidth * 2 - 100) {
				this.scrollLeft = scrollLeft - this.scrollViewWidth
				this.current = this.current + 1
			}
		},
		clickItem(item) {
			this.$emit('selectData', item)
		}
	}
}
</script>
<style lang="scss" scoped>
.scroll-view {
	display: inline-block;
	width: 100%;
	white-space: nowrap;
	.view-cantainer {
		width: 300%;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		.view-flex {
			width: 100%;
			display: flex;
			flex-direction: row;
			align-items: center;
			.item {
				flex: 1;
				border: 1rpx solid #ccc;
				text-align: center;
				.day-text,
				.week-text,
				.lunar-text {
					font-size: 24rpx;
				}
			}
			.item.isToday {
				color: red;
			}
			.item.isActive {
				color: blue;
			}
		}
	}
}
</style>
