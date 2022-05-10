import { useState, useEffect } from 'react';
/**
 *
 * @returns {boolean} Is navigator online
 */
function getIsOnline() {
    if ( typeof window === 'undefined' ) {
        return null;
    }
    return navigator.onLine;
}

function useOnline() {
    const [isOnline, setIsOnline] = useState( () => getIsOnline() );

    function setOffline() {
        setIsOnline(false);
    }

    function setOnline() {
        setIsOnline(true);
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('online', setOnline);
            window.addEventListener('offline', setOffline);

            return () => {
                window.removeEventListener('online', setOnline);
                window.removeEventListener('offline', setOffline);
            }
        } else {
            console.warn(`window is undefined. You may are using useOnline in server side.`);
        }

    }, [])

    return isOnline;
}

export { useOnline };