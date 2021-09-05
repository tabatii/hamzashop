<template>
	<v-container class="py-0">
		<v-row justify="center" no-gutters>
			<v-col cols="6">
				<v-sheet class="d-flex flex-column justify-center" min-height="100vh">
					<div class="pa-16">
						<v-text-field
							v-model="form.name"
							:label="$lang('register.form.name')"
							:error-messages="errors.name"
							outlined autofocus
						/>
						<v-text-field
							v-model="form.email"
							:label="$lang('register.form.email')"
							:error-messages="errors.email"
							outlined
						/>
						<v-text-field
							v-model="form.password"
							:label="$lang('register.form.password')"
							:error-messages="errors.password"
							:append-icon="show.password ? 'mdi-eye' : 'mdi-eye-off'"
							:type="show.password ? 'text' : 'password'"
							@click:append="show.password = !show.password"
							outlined
						/>
						<v-text-field
							v-model="form.password_confirmation"
							:label="$lang('register.form.confirmation')"
							:error-messages="errors.password_confirmation"
							:append-icon="show.confirmation ? 'mdi-eye' : 'mdi-eye-off'"
							:type="show.confirmation ? 'text' : 'password'"
							@click:append="show.confirmation = !show.confirmation"
							outlined
						/>
						<div>
							<v-btn color="primary" :loading="loading" block depressed x-large @click="register">
								{{ $lang('register.form.submit') }}
							</v-btn>
							<v-row class="align-center" no-gutters>
								<v-col>
									<v-divider></v-divider>
								</v-col>
								<v-col cols="1" class="my-2">
									<center v-text="$lang('register.separator')"></center>
								</v-col>
								<v-col>
									<v-divider></v-divider>
								</v-col>
							</v-row>
							<v-btn to="/auth/login" block depressed x-large nuxt>
								{{ $lang('register.form.btn') }}
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
					this.$cookies.set('u', response.user.email, {
						maxAge: response.expires,
						path: '/'
					})
					this.$cookies.set('uv', true, {
						maxAge: response.expires,
						path: '/'
					})
					this.$router.replace('/verification')
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
