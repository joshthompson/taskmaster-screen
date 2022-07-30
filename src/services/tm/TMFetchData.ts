import xhr from '@/services/shared/xhr'
import { TMScreenState, TMState } from '@/types/TaskMaster'

export async function getState() {
	return await xhr.get('http://localhost:6226/taskmaster/state') as TMState
}

export async function setServerState(state: any) {
	await xhr.get('http://localhost:6226/taskmaster/state/set?state=' + JSON.stringify(state))
}
