export async function sleep(ms: number) {
	await new Promise((r) => setTimeout(r, ms))
}

export function WLDisplayMoney(value: number, useBr: boolean = false, emoji: string = '🧻', rollName = 'roll') {
	const rolls = Math.floor(value / 500)
	const sheets = value % 500
	const rollsStr = rolls === 1 ? `${emoji} 1 ${rollName}` : `${emoji} ${rolls} ${rollName}s`
	const sheetsStr = sheets === 1 ? '1 sheet' : `${sheets} sheets`
	if (value === 0) {
		return `0 ${rollName}s`
	}
	if (useBr) {
		return `${rolls ? rollsStr + (sheets ? '<br/>' : '') : ''}${sheets ? sheetsStr : ''}`
	} else {
		return `${rolls ? rollsStr + (sheets ? ' and ' : '') : ''}${sheets ? sheetsStr : ''}`
	}
}
