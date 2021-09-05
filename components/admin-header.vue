<template>
	<header>
		<v-app-bar color="white" height="75" tag="div" flat>
			<v-container class="pa-0" fluid>
				<div class="d-flex align-center">
					<div>
						<v-toolbar-title>
							<app-logo />
						</v-toolbar-title>
					</div>
					<div class="ml-auto">
						<v-btn to="/admin/products/form" color="primary" icon nuxt><v-icon>mdi-plus</v-icon></v-btn>
						<!--<v-menu transition="scroll-y-transition" :close-on-content-click="false" offset-y left>
							<template v-slot:activator="{ on, attrs }">
								<v-btn color="primary" icon v-bind="attrs" v-on="on"><v-icon>mdi-forum</v-icon></v-btn>
							</template>
							<v-list class="pa-0" width="400">
								<v-list-item>
									<v-list-item-content>
										<v-list-item-title class="text-h6">Messages</v-list-item-title>
									</v-list-item-content>
									<v-list-item-action>
										<v-btn color="primary" icon small><v-icon>mdi-autorenew</v-icon></v-btn>
									</v-list-item-action>
								</v-list-item>
								<v-divider></v-divider>
								<template v-for="(message, i) in messages.data">
									<v-list-item :key="message.id">
										<v-list-item-content>
											<v-list-item-title v-text="message.name"></v-list-item-title>
											<v-list-item-subtitle v-text="message.content"></v-list-item-subtitle>
										</v-list-item-content>
										<v-list-item-action class="align-self-start">
											<v-list-item-action-text v-text="time(message.created_at)"></v-list-item-action-text>
										</v-list-item-action>
									</v-list-item>
									<v-divider :class="{'pb-2': i === messages.data.length-1}"></v-divider>
								</template>
							</v-list>
						</v-menu>-->
						<v-btn color="primary" icon><v-icon>mdi-forum</v-icon></v-btn>
						<v-btn color="primary" icon><v-icon>mdi-bell</v-icon></v-btn>
						<v-btn color="primary" :loading="loading" icon @click="logout"><v-icon>mdi-logout</v-icon></v-btn>
					</div>
				</div>
			</v-container>
		</v-app-bar>
	</header>
</template>

<script>
	import moment from 'moment'
	export default {
		methods: {
			logout () {
				this.loading = true
				this.$admin.$post('/admin/logout')
				.finally(() => {
					this.$cookies.remove('at')
					this.$router.go()
				})
			},
			time (date) {
				return moment(date).fromNow()
			}
		},
		data () {
			return {
				loading: false,
				messages: {}
			}
		}
	}
</script>
