let changeCount = 0

export function addChange(): number {
	return ++changeCount
}

export function getChange(): number {
	return changeCount
}
