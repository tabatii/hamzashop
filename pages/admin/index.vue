<template></template>

<script>
	export default {
		middleware: 'admin',
		layout: 'empty',
		created () {
			this.$router.replace('/admin/dashboard')
		}
	}
</script>
