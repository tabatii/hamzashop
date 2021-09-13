<template>
	<div class="pa-12">
		<v-row>
			<v-col cols="12">
				<v-card>
					<v-card-text class="text--primary pa-0">
						<v-row no-gutters>
							<v-col cols="12" v-for="notification in notifications.data" :key="notification.id">
								<div class="d-flex pa-4">
									<div>
										<v-btn fab depressed>
											<v-icon v-text="notification.icon"></v-icon>
										</v-btn>
									</div>
									<div class="flex-grow-1 ml-3">
										<p class="body-1 mb-1" v-html="notification.content"></p>
										<span class="text--secondary" v-text="ago(notification.created_at)"></span>
									</div>
								</div>
								<v-divider></v-divider>
							</v-col>
						</v-row>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>

<script>
	import moment from 'moment';
	export default {
		middleware: 'admin',
		layout: 'admin',
		head: {
			title: 'Notifications'
		},
		methods: {
			ago (date) {
				return moment(date).fromNow()
			}
		},
		async asyncData ({$admin}) {
			let notifications = await $admin.$get('/notifications')
			return {notifications}
		},
		data () {
			return {
				notifications: {}
			}
		}
	}
</script>
