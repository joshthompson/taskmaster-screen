import { TMState } from '@/types/TaskMaster'
import { WLState } from '@/types/WeakestLink'
import { PLState } from '@/types/Pointless'

export interface AppState {
	wl: WLState
	tm: TMState
	pl: PLState
	volume: number
}
