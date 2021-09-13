export default function ({store, $admin}) {
	$admin.$get('dashboard/header').then(response => {
		store.commit('header/notifications', response.notifications)
		store.commit('header/messages', response.messages)
	})
}
