<template>
	<v-container class="py-0">
		<v-row justify="center" no-gutters>
			<v-col lg="8" xl="6">
				<v-sheet class="d-flex flex-column justify-center" min-height="100vh">
					<div class="pa-3 pa-sm-16">
						<v-snackbar v-if="errors.auth" v-model="snackbar" color="error" timeout="10000" top text>
							{{ errors.auth }}
						</v-snackbar>
						<v-text-field
							v-model="form.email"
							:label="$lang('login.form.email')"
							:error-messages="errors.email"
							outlined autofocus
						/>
						<v-text-field
							v-model="form.password"
							:label="$lang('login.form.password')"
							:error-messages="errors.password"
							:append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
							:type="show ? 'text' : 'password'"
							@click:append="show = !show"
							outlined hide-details
						/>
						<div class="error-wrapper d-flex mb-6">
							<span class="error-text" v-if="errors.password" v-text="errors.password[0]"></span>
							<nuxt-link to="/auth/forgot" class="forgot body-2" color="primary" text>{{ $lang('login.form.forgot') }}</nuxt-link>
						</div>
						<div>
							<v-btn color="primary" :loading="loading" block depressed x-large @click="login">
								{{ $lang('login.form.submit') }}
							</v-btn>
							<v-row class="align-center" no-gutters>
								<v-col>
									<v-divider></v-divider>
								</v-col>
								<v-col cols="1" class="my-2">
									<center v-text="$lang('login.separator')"></center>
								</v-col>
								<v-col>
									<v-divider></v-divider>
								</v-col>
							</v-row>
							<v-btn to="/auth/register" block depressed x-large nuxt>
								{{ $lang('login.form.btn') }}
							</v-btn>
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
					if (!response.user.verified) {
						this.$cookies.set('u', response.user.email, {
							maxAge: response.expires,
							path: '/'
						})
						this.$cookies.set('uv', true, {
							maxAge: response.expires,
							path: '/'
						})
					}
					this.$cookies.set('ut', response.token, {
						maxAge: response.expires,
						path: '/'
					})
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

<style scoped>
	.forgot {
		margin-left: auto;
		line-height: .75rem;
		text-decoration: none;
	}
</style>
