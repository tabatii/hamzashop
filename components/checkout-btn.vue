<template>
	<div>
		<v-btn color="primary" block depressed x-large @click="dialog = true">Credit Card</v-btn>
		<v-dialog v-model="dialog" width="500">
			<v-card>
				<v-card-text class="pa-6">
					<v-alert v-model="invalid" class="mb-7" type="error">{{ $lang('payment.form.invalid') }}</v-alert>
					<v-text-field
						v-model="form.name"
						:error-messages="errors.name"
						:label="$lang('payment.form.name')"
						outlined dense
					/>
					<div class="d-flex">
						<div class="flex-grow-1" style="padding-top:3px">
							<v-cleave
								v-model="form.card"
								:error-messages="errors.card"
								:label="$lang('payment.form.card')"
								:options="{creditCard: true, delimiter: '  ', onCreditCardTypeChanged: t => form.type = t}"
								outlined dense
							/>
						</div>
						<div class="ml-2" v-if="supported.includes(form.type)">
							<img :src="`/svg/${form.type}.svg`" height="46px" />
						</div>
					</div>
					<v-row dense>
						<v-col cols="6">
							<v-cleave
								v-model="form.date"
								:error-messages="errors.date"
								:label="$lang('payment.form.date')"
								:options="{date: true, datePattern: ['m','y']}"
								outlined dense
							/>
						</v-col>
						<v-col cols="6">
							<v-cleave
								label="CVV"
								v-model="form.cvv"
								:error-messages="errors.cvv"
								:options="{numeral: true, delimiter: ''}"
								outlined dense
							/>
						</v-col>
					</v-row>
					<v-btn color="primary" :loading="loading" block depressed large @click="checkout">
						{{ $lang('payment.form.submit') }}
					</v-btn>
				</v-card-text>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
	import cleave from 'vuetify-cleave'
	export default {
		components: {
			'v-cleave': cleave
		},
		methods: {
			checkout () {
				this.loading = true
				this.form.product = this.$cookies.get('p')
				this.form.address = this.$cookies.get('a')
				this.form.quantity = this.$cookies.get('q')
				this.$axios.$post('/2checkout', this.form)
				.then(response => {
					this.$router.replace(`/products/${this.$cookies.get('p')}`)
				}).catch(error => {
					this.loading = false
					this.invalid = (error.response.status) === 400 ? true : false
					this.errors = (error.response.status) === 422 ? error.response.data.errors : {}
				})
			}
		},
		data () {
			return {
				loading: false,
				invalid: false,
				dialog: false,
				errors: {},
				form: {
					name: 'John Doe',
					card: '378282246310005',
					date: null,
					cvv: null,
					type: null
				},
				supported: [
					'mastercard',
					'discover',
					'visa',
					'amex',
					'jcb',
				]
			}
		}
	}
</script>
