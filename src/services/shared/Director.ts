import xhr from '@/services/shared/xhr'
import store from '@/store'

export default {
	update: (mode: string) => {
		xhr.get(`http://localhost:6226/set-director/${mode}`)
	},
	set: (mode: string) => {
		xhr.get(`http://localhost:6226/set-director/${mode}`)
		store.commit('wlSetDirector', mode)
	}
}
