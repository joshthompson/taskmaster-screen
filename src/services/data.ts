import xhr from './xhr'
import { TMState } from '@/types/TaskMaster'

export async function getState() {
	return await xhr.get('http://localhost:3000/state') as TMState
}

export async function setStateToLogo() {
	await xhr.post('http://localhost:3000/state/logo')
}
