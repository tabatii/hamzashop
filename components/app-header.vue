<template>
	<header>
		<v-app-bar color="white" height="42" tag="div" flat>
			<v-container>
				<div class="d-flex justify-end">
					<v-menu transition="scroll-y-transition" open-on-hover offset-y>
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
								<v-list-item-title v-text="$lang('header.links.french')">French</v-list-item-title>
							</v-list-item>
							<v-list-item link @click="language('en')">
								<v-list-item-avatar class="mr-2" size="20">
									<v-img src="/template/usa.png" />
								</v-list-item-avatar>
								<v-list-item-title v-text="$lang('header.links.english')">English</v-list-item-title>
							</v-list-item>
						</v-list>
					</v-menu>
					<v-menu transition="scroll-y-transition" open-on-hover offset-y>
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
			<v-container>
				<v-row no-gutters>
					<v-col cols="3">
						<v-toolbar-title>
							<app-logo />
						</v-toolbar-title>
					</v-col>
					<v-col cols="5">
						<div>
							<v-btn to="/" color="primary" text nuxt>{{ $lang('header.links.home') }}</v-btn>
							<v-btn to="/contact" color="primary" text nuxt>{{ $lang('header.links.contact') }}</v-btn>
							<v-btn :href="$config.blog" color="primary" target="_blank" text>{{ $lang('header.links.blog') }}</v-btn>
						</div>
					</v-col>
					<v-col cols="4" class="d-flex justify-end">
						<div v-if="auth.loggedIn">
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
	import { mapState } from 'vuex'
	export default {
		computed: {
			...mapState(['auth'])
		},
		methods: {
			language (code) {
				this.$cookies.set('lg', code, { path: '/' })
				this.$router.go()
			},
			currency (code) {
				fetch(`https://api.exchangerate.host/convert?from=MAD&to=${code}`)
				.then(response => {
					return response.json()
				}).then(response => {
					this.$cookies.set('cr', response.info.rate, { path: '/' })
					this.$cookies.set('cc', code, { path: '/' })
					this.$nuxt.refresh()
				})
			},
			logout () {
				this.loading = true
				this.$axios.$post('/auth/logout')
				.finally(() => {
					this.$cookies.remove('ut')
					this.$router.go()
				})
			}
		},
		data () {
			return {
				loading: false
			}
		}
	}
</script>
