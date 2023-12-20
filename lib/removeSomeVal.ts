// 配列内に同じ値がある場合、削除

export function removeSomeVal(array: any[]): any[] {
    return array.filter((v, i, arr) => arr.indexOf(v) === i);
}