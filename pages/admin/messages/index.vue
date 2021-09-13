<template>
	<div class="pa-12">
		<v-row>
			<v-col cols="12">
				<v-card>
					<v-card-text class="text--primary pa-0">
						<v-row no-gutters>
							<v-col cols="12" v-for="message in messages.data" :key="message.id">
								<div class="d-flex pa-4">
									<div>
										<v-btn fab depressed>
											<v-icon>mdi-chat</v-icon>
										</v-btn>
									</div>
									<div class="flex-grow-1 ml-3">
										<div class="d-flex">
											<div>
												<span class="text-capitalize font-weight-bold" v-text="message.name"></span>
												<span class="mx-2">|</span>
												<span class="text--secondary" v-text="message.email"></span>
											</div>
											<span class="text--secondary ml-auto" v-text="ago(message.created_at)"></span>
										</div>
										<p class="mb-0" v-html="message.content"></p>
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
			title: 'Messages'
		},
		methods: {
			ago (date) {
				return moment(date).fromNow()
			}
		},
		async asyncData ({$admin}) {
			let messages = await $admin.$get('/messages')
			return {messages}
		},
		data () {
			return {
				messages: {}
			}
		}
	}
</script>
