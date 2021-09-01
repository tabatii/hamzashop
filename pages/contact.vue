<template>
	<div>
		<section class="bg"></section>
		<section class="mb-16">
			<v-container>
				<h3 class="text-h4 text-center" v-text="$lang('contact.title')"></h3>
				<div class="line mx-auto mb-12" style="width:40px"></div>
				<v-row justify="center">
					<v-col cols="8">
						<v-row>
							<v-col cols="6">
								<v-text-field
									v-model="form.name"
									:label="$lang('contact.form.name')"
									:error-messages="errors.name"
									outlined autofocus
								/>
							</v-col>
							<v-col cols="6">
								<v-text-field
									v-model="form.email"
									:label="$lang('contact.form.email')"
									:error-messages="errors.email"
									outlined
								/>
							</v-col>
						</v-row>
						<v-textarea
							v-model="form.message"
							:label="$lang('contact.form.message')"
							:error-messages="errors.message"
							outlined
						/>
						<v-btn color="primary" :loading="loading" block depressed x-large @click="send">{{ $lang('contact.form.submit') }}</v-btn>
					</v-col>
				</v-row>
			</v-container>
		</section>
	</div>
</template>

<script>
	export default {
		head: {
			title: 'Contact'
		},
		methods: {
			send () {
				this.loading = true
				this.$axios.$post('/contact', this.form)
				.then(response => {
					this.$router.push('/')
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
					name: null,
					email: null,
					message: null
				}
			}
		}
	}
</script>
