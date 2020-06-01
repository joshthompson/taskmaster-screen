import xhr from '@/services/xhr'
import store from '@/store'

export default {
	set: (mode: string) => {
		xhr.get(`http://localhost:6226/weakest-link/set-director/${mode}`)
		store.commit('wlSetDirector', mode)
	}
}
