import { FullUser } from "./Type";

export function loadSavedUsers(): FullUser[] {
    const item = localStorage.getItem("weather");
    return item ? JSON.parse(item) : []; // Повертаємо порожній масив, щоб уникнути помилок
}
