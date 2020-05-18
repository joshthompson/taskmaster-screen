export async function sleep(ms: number) {
	await new Promise((r) => setTimeout(r, ms))
}

export function WLDisplayMoney(value: number) {
	const rolls = Math.floor(value / 500)
	const sheets = value % 500
	const rollsStr = rolls === 1 ? '🧻 1 roll' : `🧻 ${rolls} rolls`
	const sheetsStr = sheets === 1 ? '1 sheet' : `${sheets} sheets`
	if (value === 0) {
		return '0 sheets'
	}
	return `${rolls ? rollsStr + (sheets ? ' and ' : '') : ''}${sheets ? sheetsStr : ''}`
}
