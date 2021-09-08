<template>
	<v-container class="py-16">
		<v-row justify="center">
			<v-col sm="8" lg="5">
				<v-card>
					<v-card-title class="justify-center">Please verify your account</v-card-title>
					<v-divider></v-divider>
					<v-card-text class="text--primary text-center">
						<div v-if="$cookies.get('uv')">
							<p>We have sent an email message to <b v-text="$cookies.get('u')"></b>.</p>
							<p class="mb-0">Just click on the button in that message to verify your account.</p>
							<p>if you dont see it, you may need to <b>ckeck your spam</b> folder.</p>
							<p>Still can't find the message ?</p>
							<v-btn color="primary" :loading="loading" @click="resend">Resend email message</v-btn>
						</div>
						<div v-else>
							<p>You have already verified your account.</p>
							<v-btn to="/" color="primary">Go shopping</v-btn>
						</div>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
	export default {
		middleware: 'auth',
		layout: 'empty',
		head: {
			title: 'Verification'
		},
		methods: {
			resend () {
				this.loading = true
				this.$axios.post('/email/resend')
				.then(response => {
					this.loading = false
				}).catch(error => {
					if (error.response.status === 403) {
						this.$cookies.remove('uv')
						this.$cookies.remove('u')
						this.$router.go()
					}
				})
			}
		},
		async asyncData ({$axios}) {
			let user = await $axios.$get('/auth/me')
			return {user}
		},
		data () {
			return {
				loading: false,
				user: {}
			}
		}
	}
</script>
