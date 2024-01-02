export function genNonce(): string {
    return (Math.floor(Date.now() / 1000) * 4194304).toString();
}