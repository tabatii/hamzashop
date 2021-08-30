<template>
	<v-btn color="secondary" block depressed x-large @click="card">Credit Card</v-btn>
</template>

<script>
	export default {
		methods: {
			card () {
				this.$swal('This action is not ready yet.')
			}
		}
	}
</script>
