<template>
	<v-footer dark padless>
		<v-container class="py-0">
			<section>
				<v-row>
					<v-col cols="4">
						<p class="body-1 mb-5">About us</p>
						<p class="font-weight-thin">
							This website is dedicated to selling hair care products and treating all hair problems such as hair loss, genetic and non-genetic baldness, alopecia, dandruff and itching.
						</p>
						<div>
							<v-btn href="https://www.facebook.com" target="_blank" icon>
								<v-icon size="24px">mdi-facebook</v-icon>
							</v-btn>
							<v-btn href="https://www.twitter.com" target="_blank" icon>
								<v-icon size="24px">mdi-twitter</v-icon>
							</v-btn>
							<v-btn href="https://www.instagram.com" target="_blank" icon>
								<v-icon size="24px">mdi-instagram</v-icon>
							</v-btn>
						</div>
					</v-col>
					<v-col cols="2" class="px-0">
						<p class="body-1 px-3">Quick Links</p>
						<div><v-btn to="/contact" plain small>Contact us</v-btn></div>
						<div><v-btn :href="$config.blog" target="_blank" plain small>Blog</v-btn></div>
						<div><v-btn to="/auth/login" plain small>Login</v-btn></div>
						<div><v-btn to="/auth/register" plain small>Sign up</v-btn></div>
					</v-col>
					<v-col cols="2" class="px-0">
						<p class="body-1 px-3">Other Links</p>
						<div><v-btn to="/links/terms-conditions" plain small>Terms & Conditions</v-btn></div>
						<div><v-btn to="/links/privacy-policy" plain small>Privacy policy</v-btn></div>
						<div><v-btn to="/links/refund-policy" plain small>Refund policy</v-btn></div>
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
				<span class="body-1 font-weight-thin">Designed By {{ $config.designer }}</span>
				<span class="body-1 font-weight-thin ml-auto">{{ $config.url }} | © 2021</span>
			</div>
		</v-container>
	</v-footer>
</template>
