export const LS = {
        get: (name: string) => {
            return localStorage.getItem(name)
        },
        set: (name: string, value: any) => {
            return localStorage.setItem(name, JSON.stringify(value))
        },
        remove: (name: string) => {
            return localStorage.removeItem(name)
        },
    }