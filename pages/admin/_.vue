<template>
	<div class="text-center pa-12">
		<h1>4O4</h1>
		<p>Page Not Found</p>
	</div>
</template>

<script>
	export default {
		middleware: 'admin',
		layout: 'admin',
		head: {
			title: '404'
		}
	}
</script>

<style scoped>
	h1 {
		color: var(--v-primary-lighten2);
		font-size: 15rem;
		font-weight: 100;
		line-height: 1;
	}
	p {
		color: var(--v-primary-lighten2);
		font-size: 3rem;
		font-weight: 300;
		margin-bottom: 0;
	}
</style>
