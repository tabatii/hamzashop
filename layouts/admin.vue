<template>
	<v-app>
		<v-main class="bg">
			<v-row no-gutters>
				<v-col cols="12" sm="3" xl="2" class="side">
					<admin-side />
				</v-col>
				<v-col cols="12" sm="9" xl="10">
					<admin-header />
					<Nuxt />
				</v-col>
			</v-row>
		</v-main>
	</v-app>
</template>

<script>
	export default {
		name: 'AdminLayout',
		middleware: 'header'
	}
</script>

<style scoped>
	.side {
		min-height: 100vh;
		background-color: var(--v-primary-darken4);
	}
</style>
