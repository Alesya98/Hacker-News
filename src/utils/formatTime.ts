
export const formatTime = (time: number): string => {
    const now = Math.floor(Date.now() / 1000);
    const diff = now - time;
    
    if (diff < 60) {
        return 'только что';
    }
    
    const minutes = Math.floor(diff / 60);
    if (minutes < 60) {
        return `${minutes} мин назад`;
    }
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) {
        return `${hours} ч назад`;
    }
    
    const days = Math.floor(hours / 24);
    if (days < 7) {
        return `${days} д назад`;
    }
    
    const date = new Date(time * 1000);
    return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
};