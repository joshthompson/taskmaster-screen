import OBSWebSocket from 'obs-websocket-js'
import { sleep } from './helper'

const obs = new OBSWebSocket()
let connected = false

async function connect() {
	if (!connected) {
		try {
			await obs.connect({ password: '12345678' })
			connected = true
		} catch {
			connected = false
		}
	}
	return connected
}

async function getScenes() {
	await connect()
	return obs.send('GetSceneList')
}

async function setScene(name) {
	await connect()
	return obs.send('SetCurrentScene', { ['scene-name']: name })
}

async function setSourceSettings(sourceName, sourceSettings) {
	await connect()
	return obs.send('SetSourceSettings', { sourceName, sourceSettings })
}

async function setSourcePosition(sceneName, item, x = 0, y = 0) {
	await connect()
	return obs.send('SetSceneItemPosition', { ['scene-name']: sceneName, item, x, y })
}

async function getSourceSettings() {
	await connect()
	return obs.send('GetSourceSettings', {
		sourceName: 'Category Name'
	})
}

async function setTextAndCenter(sceneName: string, sourceName: string, text: string) {
	await sleep(100)
	await connect()
	let props = await obs.send('GetSceneItemProperties', { ['scene-name']: sceneName, item: { name: sourceName }})
	await obs.send('SetSceneItemProperties', {
		['scene-name']: sceneName,
		item: { name: sourceName },
		...props,
		visible: false
	})
	await setSourceSettings(sourceName, { text: text })
	await sleep(100)
	props = await obs.send('GetSceneItemProperties', { ['scene-name']: sceneName, item: { name: sourceName }})

	// const maxWidth = 1200
	const scale = 0.35

	await obs.send('SetSceneItemProperties', {
		['scene-name']: sceneName,
		item: { name: sourceName },
		...props,
		scale: { x: scale, y: scale },
		position: {
			x: 1280 / 2 - props.width / 2,
			y: props.position.y
		},
		visible: true
	})
}


export default {
	getScenes,
	setScene,
	getSourceSettings,
	setSourceSettings,
	setSourcePosition,
	setTextAndCenter
}
