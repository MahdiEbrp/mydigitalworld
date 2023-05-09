export type CookieOptions = {
    path?: string;
    expires?: Date;
};

export class CookieManager {
    public static setCookie(name: string, value: string, options?: CookieOptions) {
        let cookieString = `${name}=${value};`;

        if (options?.path) {
            cookieString += `path=${options.path};`;
        }

        if (options?.expires) {
            cookieString += `expires=${options.expires.toUTCString()};`;
        }

        document.cookie = cookieString;
    }

    public static getCookie(name: string): string | null {
        const cookies = document.cookie.split(';');

        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();

            if (cookie.startsWith(`${name}=`)) {
                const cookieValue = cookie.substring(name.length + 1);
                try {
                    return decodeURIComponent(cookieValue);
                } catch (e) {
                    return null;
                }
            }
        }

        return null;
    }
    public static deleteCookie(name: string, path?: string) {
        const options: CookieOptions = { path, expires: new Date(0) };
        this.setCookie(name, '', options);
    }
}
