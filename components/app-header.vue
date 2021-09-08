<template>
	<header>
		<v-alert v-model="verify" color="error" class="pa-0 mb-0" text tile>
			<v-container>
				<span class="mr-2">Verify your account now.</span>
				<v-btn to="/verification" color="primary" small depressed>Resend link</v-btn>
			</v-container>
		</v-alert>
		<v-app-bar color="white" height="42" tag="div" flat>
			<v-container>
				<div class="d-flex justify-end">
					<v-menu transition="scroll-y-transition" offset-y>
						<template v-slot:activator="{ on, attrs }">
							<v-btn class="px-1" plain small v-bind="attrs" v-on="on">
								<span class="pl-1" v-text="$lang('header.links.language')"></span>
								<v-icon size="20">mdi-chevron-down</v-icon>
							</v-btn>
						</template>
						<v-list dense>
							<v-list-item link @click="language('fr')">
								<v-list-item-avatar class="mr-2" size="20">
									<v-img src="/template/fr.png" />
								</v-list-item-avatar>
								<v-list-item-title v-text="$lang('header.links.french')"></v-list-item-title>
							</v-list-item>
							<v-list-item link @click="language('en')">
								<v-list-item-avatar class="mr-2" size="20">
									<v-img src="/template/usa.png" />
								</v-list-item-avatar>
								<v-list-item-title v-text="$lang('header.links.english')"></v-list-item-title>
							</v-list-item>
						</v-list>
					</v-menu>
					<v-menu transition="scroll-y-transition" offset-y>
						<template v-slot:activator="{ on, attrs }">
							<v-btn class="px-1 ml-2" plain small v-bind="attrs" v-on="on">
								<span class="pl-1" v-text="$lang('header.links.currency')"></span>
								<v-icon size="20">mdi-chevron-down</v-icon>
							</v-btn>
						</template>
						<v-list dense>
							<v-list-item link @click="currency('MAD')">
								<v-list-item-avatar class="mr-2" size="20">
									<v-img src="/template/ma.png" />
								</v-list-item-avatar>
								<v-list-item-title>MAD</v-list-item-title>
							</v-list-item>
							<v-list-item link @click="currency('EUR')">
								<v-list-item-avatar class="mr-2" size="20">
									<v-img src="/template/eu.png" />
								</v-list-item-avatar>
								<v-list-item-title>EUR</v-list-item-title>
							</v-list-item>
							<v-list-item link @click="currency('USD')">
								<v-list-item-avatar class="mr-2" size="20">
									<v-img src="/template/usa.png" />
								</v-list-item-avatar>
								<v-list-item-title>USD</v-list-item-title>
							</v-list-item>
						</v-list>
					</v-menu>
				</div>
			</v-container>
		</v-app-bar>
		<v-divider style="border-color:var(--v-background-base)"></v-divider>
		<v-app-bar color="white" height="75" tag="div" flat>
			<v-container class="d-lg-none">
				<v-row no-gutters>
					<v-col lg="6">
						<v-toolbar-title>
							<app-logo />
						</v-toolbar-title>
					</v-col>
					<v-col lg="6" class="d-flex justify-end">
						<v-menu transition="scroll-y-transition" offset-y left>
							<template v-slot:activator="{ on, attrs }">
								<v-btn class="px-3" min-width="36" depressed v-bind="attrs" v-on="on">
									<v-icon>mdi-menu</v-icon>
								</v-btn>
							</template>
							<v-list min-width="200">
								<v-list-item to="/" nuxt>
									<v-list-item-title v-text="$lang('header.links.home')"></v-list-item-title>
								</v-list-item>
								<v-list-item to="/contact" nuxt>
									<v-list-item-title v-text="$lang('header.links.contact')"></v-list-item-title>
								</v-list-item>
								<v-list-item :href="$config.blog" target="_blank" nuxt>
									<v-list-item-title v-text="$lang('header.links.blog')"></v-list-item-title>
								</v-list-item>
								<v-list-item to="/auth/login" nuxt v-if="!$cookies.get('ut')">
									<v-list-item-title v-text="$lang('header.links.login')"></v-list-item-title>
								</v-list-item>
								<v-list-item to="/auth/register" nuxt v-if="!$cookies.get('ut')">
									<v-list-item-title v-text="$lang('header.links.register')"></v-list-item-title>
								</v-list-item>
								<v-list-item to="/account/orders" nuxt v-if="$cookies.get('ut')">
									<v-list-item-title v-text="$lang('header.links.orders')"></v-list-item-title>
								</v-list-item>
								<v-list-item @click="logout" v-if="$cookies.get('ut')">
									<v-list-item-title v-text="$lang('header.links.logout')"></v-list-item-title>
								</v-list-item>
							</v-list>
						</v-menu>
					</v-col>
				</v-row>
			</v-container>
			<v-container class="d-none d-lg-block">
				<v-row no-gutters>
					<v-col lg="3">
						<v-toolbar-title>
							<app-logo />
						</v-toolbar-title>
					</v-col>
					<v-col lg="4">
						<div class="px-2">
							<v-btn to="/" color="primary" text nuxt>{{ $lang('header.links.home') }}</v-btn>
							<v-btn to="/contact" color="primary" text nuxt>{{ $lang('header.links.contact') }}</v-btn>
							<v-btn :href="$config.blog" color="primary" target="_blank" text>{{ $lang('header.links.blog') }}</v-btn>
						</div>
					</v-col>
					<v-col lg="5" class="d-flex justify-end">
						<div v-if="$cookies.get('ut')">
							<v-btn to="/account/orders" color="primary" text nuxt>{{ $lang('header.links.orders') }}</v-btn>
							<v-btn color="primary" :loading="loading" text @click="logout">{{ $lang('header.links.logout') }}</v-btn>
						</div>
						<div v-else>
							<v-btn to="/auth/login" color="primary" text nuxt>{{ $lang('header.links.login') }}</v-btn>
							<v-btn to="/auth/register" color="primary" depressed nuxt>{{ $lang('header.links.register') }}</v-btn>
						</div>
					</v-col>
				</v-row>
			</v-container>
		</v-app-bar>
	</header>
</template>

<script>
	export default {
		computed: {
			verify () {
				return this.$cookies.get('uv') ? true : false
			}
		},
		methods: {
			logout () {
				this.loading = true
				this.$axios.$post('/auth/logout')
				.finally(() => {
					this.$cookies.remove('ut')
					this.$cookies.remove('uv')
					this.$cookies.remove('u')
					this.$router.go()
				})
			},
			language (code) {
				if (code !== this.$cookies.get('lg')) {
					this.$cookies.set('lg', code, {
						maxAge: 60 * 60 * 24 * 60,
						path: '/'
					})
					this.$router.go()
				}
			},
			currency (code) {
				if (code !== this.$cookies.get('cc')) {
					fetch(`https://api.exchangerate.host/convert?from=MAD&to=${code}`)
					.then(response => {
						return response.json()
					}).then(response => {
						this.$cookies.set('cr', response.info.rate, {
							maxAge: 60 * 60 * 24 * 60,
							path: '/'
						})
						this.$cookies.set('cc', code, {
							maxAge: 60 * 60 * 24 * 60,
							path: '/'
						})
						this.$nuxt.refresh()
					})
				}
			}
		},
		data () {
			return {
				loading: false
			}
		}
	}
</script>
