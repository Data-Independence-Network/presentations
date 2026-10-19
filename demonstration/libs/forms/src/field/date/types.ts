export type DateOfMonth = 1 | 2 | 3 | 4 | 5 | 6 | 7
	| 8 | 9 | 10 | 11 | 12 | 13 | 14
	| 15 | 16 | 17 | 18 | 19 | 20 | 21
	| 22 | 23 | 24 | 25 | 26 | 27 | 28
	| 29 | 30 | 31

export type Month = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11

export function utcNow(): Date {
	const nowLocal = new Date()

	return new Date(Date.UTC(nowLocal.getFullYear(), nowLocal.getMonth(), nowLocal.getDate()))
}
