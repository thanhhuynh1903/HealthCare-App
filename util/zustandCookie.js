import { create } from 'zustand';

const useCookieStore = create((set) => ({
  cookies: {}, // Keeps track of the cookies in the state
  // Method to set a cookie
  setCookie: (name, value, days) => {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = `${name}=${value || ''}${expires}; path=/`;

    set((state) => ({
      cookies: { ...state.cookies, [name]: value },
    }));
  },
  // Method to get a cookie
  getCookie: (name) => {
    const nameEQ = `${name}=`;
    const cookiesArray = document.cookie.split(';');
    for (let i = 0; i < cookiesArray.length; i++) {
      let cookie = cookiesArray[i].trim();
      if (cookie.indexOf(nameEQ) === 0) {
        return cookie.substring(nameEQ.length, cookie.length);
      }
    }
    return null;
  },
  // Method to delete a cookie
  deleteCookie: (name) => {
    document.cookie = `${name}=; Max-Age=-99999999; path=/`;

    set((state) => {
      const updatedCookies = { ...state.cookies };
      delete updatedCookies[name];
      return { cookies: updatedCookies };
    });
  },
}));

export default useCookieStore;
