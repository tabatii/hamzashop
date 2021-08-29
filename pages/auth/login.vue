<template>
	<v-container class="py-0">
		<v-row justify="center" no-gutters>
			<v-col cols="6">
				<v-sheet class="d-flex flex-column justify-center" min-height="100vh">
					<div class="pa-16">
						<v-snackbar v-if="errors.auth" v-model="snackbar" color="error" timeout="10000" top text>{{ errors.auth }}</v-snackbar>
						<v-text-field
							label="Email"
							v-model="form.email"
							:error-messages="errors.email"
							outlined autofocus
						/>
						<v-text-field
							label="Password"
							v-model="form.password"
							:error-messages="errors.password"
							:append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
							:type="show ? 'text' : 'password'"
							@click:append="show = !show"
							outlined
						/>
						<div>
							<v-btn color="primary" :loading="loading" block depressed x-large @click="login">Login</v-btn>
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
							<v-btn to="/auth/register" block depressed x-large nuxt>Register</v-btn>
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
			title: 'Login'
		},
		methods: {
			login () {
				this.loading = true
				this.$axios.$post('/auth/login', this.form)
				.then(response => {
					this.$cookies.set('ut', response.token, {
						maxAge: response.expires,
						path: '/'
					})
					this.$store.commit('auth/login', response.user)
					this.$router.replace('/')
				}).catch(error => {
					this.loading = false
					this.snackbar = (error.response.status) === 401 ? true : false
					this.errors = error.response.data.errors
				})
			}
		},
		data () {
			return {
				snackbar: false,
				loading: false,
				show: false,
				errors: {},
				form: {
					email: null,
					password: null
				}
			}
		}
	}
</script>
