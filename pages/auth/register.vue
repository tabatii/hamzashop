<template>
	<v-container class="py-0">
		<v-row justify="center" no-gutters>
			<v-col cols="6">
				<v-sheet class="d-flex flex-column justify-center" min-height="100vh">
					<div class="pa-16">
						<v-text-field
							label="Name"
							v-model="form.name"
							:error-messages="errors.name"
							outlined autofocus
						/>
						<v-text-field
							label="Email"
							v-model="form.email"
							:error-messages="errors.email"
							outlined
						/>
						<v-text-field
							label="Password"
							v-model="form.password"
							:error-messages="errors.password"
							:append-icon="show.password ? 'mdi-eye' : 'mdi-eye-off'"
							:type="show.password ? 'text' : 'password'"
							@click:append="show.password = !show.password"
							outlined
						/>
						<v-text-field
							label="Confirmation"
							v-model="form.password_confirmation"
							:error-messages="errors.password_confirmation"
							:append-icon="show.confirmation ? 'mdi-eye' : 'mdi-eye-off'"
							:type="show.confirmation ? 'text' : 'password'"
							@click:append="show.confirmation = !show.confirmation"
							outlined
						/>
						<div>
							<v-btn color="primary" :loading="loading" block depressed x-large @click="register">Register</v-btn>
							<v-row class="align-center" no-gutters>
								<v-col>
									<v-divider></v-divider>
								</v-col>
								<v-col cols="1" class="my-2">
									<center>or</center>
								</v-col>
								<v-col>
									<v-divider></v-divider>
								</v-col>
							</v-row>
							<v-btn to="/auth/login" block depressed x-large nuxt>Login</v-btn>
						</div>
					</div>
				</v-sheet>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
	export default {
		middleware: 'guest',
		layout: 'empty',
		head: {
			title: 'Register'
		},
		methods: {
			register () {
				this.loading = true
				this.$axios.$post('/auth/register', this.form)
				.then(response => {
					this.$cookies.set('ut', response.token, {
						maxAge: response.expires,
						path: '/'
					})
					this.$store.commit('auth/login', response.user)
					this.$router.replace('/')
				}).catch(error => {
					this.loading = false
					this.errors = error.response.data.errors
				})
			}
		},
		data () {
			return {
				loading: false,
				errors: {},
				show: {
					password: false,
					confirmation: false
				},
				form: {
					name: null,
					email: null,
					password: null,
					password_confirmation: null
				}
			}
		}
	}
</script>
