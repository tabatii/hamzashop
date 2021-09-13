<template>
	<v-container class="py-16">
		<v-row justify="center">
			<v-col sm="8" lg="5">
				<v-card>
					<v-card-title class="justify-center">Account verified</v-card-title>
					<v-divider></v-divider>
					<v-card-text class="text-center">
						<p>Redirecting</p>
						<v-progress-circular color="primary" indeterminate />
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
	export default {
		layout: 'empty',
		head: {
			title: 'Verified'
		},
		mounted () {
			this.$cookies.remove('uv')
			this.$cookies.remove('u')
			setTimeout(() => {
				this.$router.replace('/')
			}, 2000)
		}
	}
</script>
