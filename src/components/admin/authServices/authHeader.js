export default function AuthHeader() {
    const token = localStorage.getItem("token");
    if (token) {
        return {headers: {'authorization':"bearer "+token}}
    } 
    else {
      return {};
    }
  }