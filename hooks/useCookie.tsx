"use client";
type CookieFunctions = {
  getCookie: () => string | null;
  setCookie: (value: string, expirationDays: number) => void;
  removeCookie: () => void;
};

export function useCookie(cookieName: string): CookieFunctions {
  const getCookie = (): string | null => {
    if (typeof document === "undefined") return null;
    const name = `${cookieName}=`;

    const decodedCookie = decodeURIComponent(document?.cookie);
    const cookieArray = decodedCookie.split(";");

    for (let i = 0; i < cookieArray.length; i++) {
      const cookie = cookieArray[i].trim();
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return "";
  };

  const setCookie = (value: string, expirationDays: number): void => {
    const date = new Date();
    date.setTime(date.getTime() + expirationDays * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${cookieName}=${value};${expires};path=/`;
  };

  const removeCookie = (): void => {
    document.cookie = `${cookieName}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
  };

  return { getCookie, setCookie, removeCookie };
}
