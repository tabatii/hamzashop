<template>
	<div>
		<v-btn color="primary" block depressed x-large @click="dialog = true">Credit Card</v-btn>
		<v-dialog v-model="dialog" width="400">
			<v-card>
				<v-card-text class="pa-6">
					<v-alert v-model="invalid" class="mb-7" type="error">{{ $lang('payment.form.invalid') }}</v-alert>
					<div class="d-flex">
						<div class="flex-grow-1" style="padding-top:3px">
							<v-cleave
								v-model="form.card"
								:error-messages="errors.card"
								:label="$lang('payment.form.card')"
								:options="{creditCard: true, delimiter: '  ', onCreditCardTypeChanged: t => type = t}"
								outlined dense
							/>
						</div>
						<div class="ml-2">
							<img :src="`/svg/${type}.svg`" height="46px" />
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
							<v-text-field
								label="CVV"
								v-mask="'####'"
								v-model="form.cvv"
								:error-messages="errors.cvv"
								outlined dense
							/>
						</v-col>
					</v-row>
					<v-btn color="primary" :loading="loading" block depressed large @click="pay">
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
			pay () {
				this.loading = true
				this.authorize()
			},
			authorize () {
				let brick = new Brick({
					public_key: this.$config.paymentwall,
					form: { formatter: true }
				}, 'custom')
				brick.tokenizeCard({
					card_number: this.form.card,
					card_expiration_month: this.form.date.substr(0,2),
					card_expiration_year: this.form.date.substr(2,2),
					card_cvv: this.form.cvv
				}, (response) => {
					if (response.type == 'Error') {
						this.loading = false
						this.invalid = true
					} else {
						this.info.fingerprint = Brick.getFingerprint()
						this.info.token = response.token
						//this.charge()
					}
				})
			},
			charge () {
				this.$axios.$post('/paymentwall', this.info)
				.then(response => {
					this.$router.replace(`/products/${this.$cookies.get('p')}`)
				}).catch(error => {
					this.loading = false
				})
			},
		},
		data () {
			return {
				type: 'unknown',
				loading: false,
				invalid: false,
				dialog: false,
				errors: {},
				form: {
					card: null,
					date: null,
					cvv: null
				},
				info: {
					token: null,
					fingerprint: null,
					quantity: null,
					product: null,
					address: null
				}
			}
		},
		mounted () {
			if (!document.getElementById('paymentwall-script')) {
				let script = document.createElement('script')
				script.src = 'https://api.paymentwall.com/brick/brick.1.4.js'
				script.id = 'paymentwall-script'
				document.body.appendChild(script)
			}
		},
		created () {
			this.info.product = this.$cookies.get('p')
			this.info.address = this.$cookies.get('a')
			this.info.quantity = this.$cookies.get('q')
		}
	}
</script>
