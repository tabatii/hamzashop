<template>
	<div>
		<section class="bg"></section>
		<section class="mb-16">
			<v-container>
				<h3 class="text-h4 text-center" v-text="$lang('contact.title')"></h3>
				<div class="line mx-auto mb-12" style="width:40px"></div>
				<v-row justify="center">
					<v-col md="8">
						<v-row no-gutters>
							<v-col cols="12" sm="6" class="pr-0 pr-sm-3">
								<v-text-field
									v-model="form.name"
									:label="$lang('contact.form.name')"
									:error-messages="errors.name"
									outlined autofocus
								/>
							</v-col>
							<v-col cols="12" sm="6" class="pl-0 pl-sm-3">
								<v-text-field
									v-model="form.email"
									:label="$lang('contact.form.email')"
									:error-messages="errors.email"
									outlined
								/>
							</v-col>
						</v-row>
						<v-textarea
							v-model="form.content"
							:label="$lang('contact.form.message')"
							:error-messages="errors.content"
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
				this.$axios.$post('/messages', this.form)
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
					content: null
				}
			}
		}
	}
</script>
