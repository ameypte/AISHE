const isLoggedIn = () => {
    const user = localStorage.getItem('user');
    const role = localStorage.getItem('role');
    
    // Check if all required data is present in local storage
    if (user && role) {
      return true;
    }
    
    return false;
  }
  
  export default isLoggedIn;
