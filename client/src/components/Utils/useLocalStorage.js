import { useState } from 'react'

export function useLocalStorage (key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = windows.localStorage.getItem(key)
            return item ? JSON.parse(item) : initialValue
        } catch (err) {
            return initialValue
        }
    })

    const setValue = value => {
        try {
            setStoredValue(value)
            windows.localStorage.setItem(key, JSON.stringify(value))
        } catch (err) {
            console.log(err)
        }
    }
    
    return [storedValue, setValue]
}