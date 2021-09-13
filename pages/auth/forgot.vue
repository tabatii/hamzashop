<template>
	<v-container class="py-0">
		<v-row justify="center" no-gutters>
			<v-col lg="8" xl="6">
				<v-sheet class="d-flex flex-column justify-center" min-height="100vh">
					<div class="pa-3 pa-sm-16">
						<v-text-field
							v-model="form.email"
							:label="$lang('forgot.form.email')"
							:error-messages="errors.email"
							outlined
						/>
						<v-btn color="primary" :loading="loading" block depressed x-large @click="send">
							{{ $lang('forgot.form.submit') }}
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
			title: 'Send reset link'
		},
		methods: {
			send () {
				this.loading = true
				this.$axios.$post('/password/forgot', this.form)
				.then(response => {
					this.loading = false
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
				form: {
					email: null
				}
			}
		}
	}
</script>
