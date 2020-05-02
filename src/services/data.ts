import xhr from './xhr'
import { State } from '@/types'

export async function getState() {
	return await xhr.get('http://localhost:3000/state') as State
}
