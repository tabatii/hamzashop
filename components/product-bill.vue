<template>
	<div>
		<v-row no-gutters>
			<v-col cols="2">
				<v-sheet outlined>
					<v-badge :content="$cookies.get('q')" overlap left>
						<v-avatar size="100%">
							<img :src="product.images[0].url" />
						</v-avatar>
					</v-badge>
				</v-sheet>
			</v-col>
			<v-col cols="7">
				<p class="body-1 text-capitalize px-2 mb-0" v-text="product.longTitle"></p>
			</v-col>
			<v-col cols="3">
				<div class="d-flex justify-end">
					<div class="font-weight-medium">
						<span v-text="$currency(product.price)"></span>
						<span v-text="$cookies.get('cc')"></span>
					</div>
				</div>
			</v-col>
		</v-row>
		<v-divider class="my-6"></v-divider>
		<div>
			<div class="d-flex justify-space-between mb-2">
				<div class="text--secondary" v-text="$lang('bill.subtotal')"></div>
				<div class="font-weight-medium">
					<span v-text="subtotal"></span>
					<span v-text="$cookies.get('cc')"></span>
				</div>
			</div>
			<div class="d-flex justify-space-between">
				<div class="text--secondary" v-text="$lang('bill.shipping')"></div>
				<div class="font-weight-medium">
					<span v-text="$currency(shipping)"></span>
					<span v-text="$cookies.get('cc')"></span>
				</div>
			</div>
		</div>
		<v-divider class="my-6"></v-divider>
		<div class="d-flex justify-space-between mb-6">
			<div class="text--secondary" v-text="$lang('bill.total')"></div>
			<div class="font-weight-medium error--text">
				<span v-text="total"></span>
				<span v-text="$cookies.get('cc')"></span>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			product: Object,
			shipping: Number
		},
		computed: {
			total () {
				let result = (this.product.price * this.$cookies.get('q')) + parseFloat(this.shipping)
				return this.$currency(result)
			},
			subtotal () {
				let result = this.product.price * this.$cookies.get('q')
				return this.$currency(result)
			}
		}
	}
</script>
