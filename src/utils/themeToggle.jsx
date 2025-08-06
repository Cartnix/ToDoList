import { useEffect, useState } from "react";

export default function useThemeToogle() {
    const [theme, setTheme] = useState(() => {
        try {
            const startTheme = localStorage.getItem('theme')
            console.log('инициализация темы')
            return startTheme || "light"
        } catch (e) {
            console.log('При попытке получить данные темы произошла ошибка')
            return "light"
        }
    })

    useEffect(() => {
        try {
            localStorage.setItem('theme', theme)
            document.body.setAttribute('data-theme', theme)
            console.log('тема сменилась')
        } catch (e) {
            console.log('Не вышло сменить тему', e)
        }
    }, [theme])

    const toggleTheme = () => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
    }

    return [theme, toggleTheme]
}