// 配列内に同じ値がある場合、削除

type ObjectType = { [key: string]: any };

export function removeSomeVal<T extends ObjectType>(array: T[]): T[] {
	const uniqueArray: T[] = [];
	const keys: Set<string> = new Set();

	array.forEach(obj => {
		const objString = JSON.stringify(obj);
		if (!keys.has(objString)) {
			keys.add(objString);
			uniqueArray.push(obj);
		}
	});

	return uniqueArray;
}
