<template>
	<v-footer dark padless>
		<v-container class="py-0">
			<section>
				<v-row>
					<v-col cols="3">
						<p class="body-1 mb-5" v-text="$lang('footer.about.title')"></p>
						<p class="font-weight-thin" v-text="$lang('footer.about.text')"></p>
						<!--<div>
							<v-btn href="https://www.facebook.com" target="_blank" icon>
								<v-icon size="24px">mdi-facebook</v-icon>
							</v-btn>
							<v-btn href="https://www.twitter.com" target="_blank" icon>
								<v-icon size="24px">mdi-twitter</v-icon>
							</v-btn>
							<v-btn href="https://www.instagram.com" target="_blank" icon>
								<v-icon size="24px">mdi-instagram</v-icon>
							</v-btn>
						</div>-->
					</v-col>
					<v-col cols="3">
						<p class="body-1 px-3" v-text="$lang('footer.links.website.title')"></p>
						<div>
							<v-btn to="/links/terms-conditions" plain small>{{ $lang('footer.links.website.terms') }}</v-btn>
						</div>
						<div>
							<v-btn to="/links/privacy-policy" plain small>{{ $lang('footer.links.website.privacy') }}</v-btn>
						</div>
						<div>
							<v-btn to="/links/shipping-rates" plain small>{{ $lang('footer.links.website.shipping') }}</v-btn>
						</div>
					</v-col>
					<v-col cols="2">
						<p class="body-1 px-3" v-text="$lang('footer.links.quick.title')"></p>
						<div>
							<v-btn to="/contact" plain small>{{ $lang('footer.links.quick.contact') }}</v-btn>
						</div>
						<div>
							<v-btn :href="$config.blog" target="_blank" plain small>{{ $lang('footer.links.quick.blog') }}</v-btn>
						</div>
						<div v-if="$cookies.get('ut')">
							<v-btn to="/auth/login" plain small>{{ $lang('footer.links.quick.orders') }}</v-btn>
						</div>
						<div v-if="!$cookies.get('ut')">
							<v-btn to="/auth/login" plain small>{{ $lang('footer.links.quick.login') }}</v-btn>
						</div>
						<div v-if="!$cookies.get('ut')">
							<v-btn to="/auth/register" plain small>{{ $lang('footer.links.quick.register') }}</v-btn>
						</div>
					</v-col>
					<v-col cols="4">
						<div class="d-flex align-center mb-4">
							<v-avatar color="secondary" size="48">
								<v-icon>mdi-map-marker</v-icon>
							</v-avatar>
							<span class="font-weight-thin ml-4">Quartier Bni Makada Lakdima Rue 54 N 31, Tanger, 90000, Morocco</span>
						</div>
						<div class="d-flex align-center mb-4">
							<v-avatar color="secondary" size="48">
								<v-icon>mdi-email</v-icon>
							</v-avatar>
							<span class="font-weight-thin ml-4">hamzaelara@gmail.com</span>
						</div>
						<div class="d-flex align-center">
							<v-avatar color="secondary" size="48">
								<v-icon>mdi-phone</v-icon>
							</v-avatar>
							<span class="font-weight-thin ml-4">+212 634-343842</span>
						</div>
					</v-col>
				</v-row>
			</section>
			<v-divider></v-divider>
			<div class="d-flex py-4">
				<span class="body-1 font-weight-thin">{{ $lang('footer.design') }} Tabatii</span>
				<span class="body-1 font-weight-thin ml-auto">{{ $config.name }} | © 2021</span>
			</div>
		</v-container>
	</v-footer>
</template>
