export default function useCookie() {
  function getCookie(name) {
    let cokikeArr = document.cookie.split(";");
    let mainCookie;
    cokikeArr.some((cokie) => {
      if (cokie.includes(name)) {
        mainCookie = cokie.substring(cokie.indexOf("=") + 1);
        return true;
      }
    });
    return mainCookie;
  }
  function setCookie(name, value) {
    const time = new Date();
    time.setTime(time.getTime() + 1000 * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};path=/;expires=${time}`;
  }
  function deleteCookie(name) {
    let mainCokie = getCookie(name);
    let time = new Date();
    time.setTime(time.getTime() - 1000 * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${mainCokie};path=/;expires=${time}`;
  }
  return { getCookie, setCookie, deleteCookie };
}
