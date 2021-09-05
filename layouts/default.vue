<template>
	<v-app>
		<app-header />
		<v-main>
			<Nuxt />
		</v-main>
		<app-footer />
	</v-app>
</template>

<script>
	export default {
		name: 'DefaultLayout'
	}
</script>
