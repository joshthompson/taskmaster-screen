import { TMState } from '@/types/TaskMaster'
import { WLState } from '@/types/WeakestLink'
import { PLState } from '@/types/Pointless'
import { WOFState } from '@/types/WheelOfFortune'

export interface AppState {
	wl: WLState
	tm: TMState
	pl: PLState
	wof: WOFState
	volume: number
}
