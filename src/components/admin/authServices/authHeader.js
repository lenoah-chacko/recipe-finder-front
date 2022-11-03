export default function authHeader() {
    const user = JSON.parse(localStorage.getItem("token"));
    if (token) {
      return { Authorization: 'Bearer ' + token };
    //   return { "x-auth-token": user.accessToken };
    } 
    else {
      return {};
    }
  }