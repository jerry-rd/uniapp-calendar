<template>
	<Jerry-Calendar @selectData="selectData" :activeDate="activeDate"></Jerry-Calendar>
</template>
<script setup>
import { ref } from 'vue'
const activeDate = ref('2023-01-01')
const selectData = (e) => {
	console.log(e)
	activeDate.value = e.date
}
</script>

<style>
.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.logo {
	height: 200rpx;
	width: 200rpx;
	margin-top: 200rpx;
	margin-left: auto;
	margin-right: auto;
	margin-bottom: 50rpx;
}

.text-area {
	display: flex;
	justify-content: center;
}

.title {
	font-size: 36rpx;
	color: #8f8f94;
}
</style>
