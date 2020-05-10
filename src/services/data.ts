import xhr from './xhr'
import { State } from '@/types'

export async function getState() {
	return await xhr.get('http://localhost:3000/state') as State
}

export async function setStateToLogo() {
	await xhr.post('http://localhost:3000/state/logo')
}
