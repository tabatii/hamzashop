<template>
	<v-container class="py-0">
		<v-row justify="center" no-gutters>
			<v-col lg="8" xl="6">
				<v-sheet class="d-flex flex-column justify-center" min-height="100vh">
					<div class="pa-3 pa-sm-16">
						<v-snackbar v-if="errors.invalid" v-model="snackbar" color="error" timeout="10000" top text>
							{{ errors.invalid }}
						</v-snackbar>
						<v-text-field
							v-model="form.password"
							:label="$lang('reset.form.password')"
							:error-messages="errors.password"
							:append-icon="show.password ? 'mdi-eye' : 'mdi-eye-off'"
							:type="show.password ? 'text' : 'password'"
							@click:append="show.password = !show.password"
							outlined
						/>
						<v-text-field
							v-model="form.password_confirmation"
							:label="$lang('reset.form.confirmation')"
							:error-messages="errors.password_confirmation"
							:append-icon="show.confirmation ? 'mdi-eye' : 'mdi-eye-off'"
							:type="show.confirmation ? 'text' : 'password'"
							@click:append="show.confirmation = !show.confirmation"
							outlined
						/>
						<v-btn color="primary" :loading="loading" block depressed x-large @click="reset">
							{{ $lang('reset.form.submit') }}
						</v-btn>
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
			title: 'Reset password'
		},
		methods: {
			reset () {
				this.loading = true
				this.form.token = this.$route.query.token;
				this.$axios.$post('/password/reset', this.form)
				.then(response => {
					this.$router.replace('/auth/login')
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
				errors: {},
				show: {
					password: false,
					confirmation: false
				},
				form: {
					token: null,
					password: null,
					password_confirmation: null
				}
			}
		}
	}
</script>
