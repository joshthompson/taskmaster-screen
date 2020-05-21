import xhr from './xhr'
import { TMState } from '@/types/TaskMaster'

export async function getState() {
	return await xhr.get('http://localhost:6226/taskmaster/state') as TMState
}

export async function setStateToLogo() {
	await xhr.post('http://localhost:6226/taskmaster/state/logo')
}
