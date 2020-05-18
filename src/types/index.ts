import { TMState } from './TaskMaster'
import { WLState } from './WeakestLink'

export interface AppState {
	wl: WLState
	tm: TMState
}
