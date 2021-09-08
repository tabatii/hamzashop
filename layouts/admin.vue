<template>
	<v-app>
		<admin-header />
		<v-main class="bg">
			<v-row no-gutters>
				<v-col sm="3" xl="2" class="side">
					<admin-side />
				</v-col>
				<v-col sm="9" xl="10">
					<Nuxt />
				</v-col>
			</v-row>
		</v-main>
	</v-app>
</template>

<script>
	export default {
		name: 'AdminLayout'
	}
</script>

<style scoped>
	.side {
		min-height: calc(100vh - 76px);
		margin-top: 1px;
		background-color: white;
	}
</style>
