const isLoggedIn = () => {
    const user = localStorage.getItem('user');
    const role = localStorage.getItem('role');
    const dept = localStorage.getItem('dept');
    
    // Check if all required data is present in local storage
    if (user && role && dept) {
      return true;
    }
    
    return false;
  }
  
  export default isLoggedIn;
