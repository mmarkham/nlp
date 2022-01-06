function checkForValidURL(inputText) {
    console.log("::: Running checkForValidURL :::", inputText);
    
    // Uses the URL constructor to determine if the inputText is a valid URL
    let url;
    try {
        url = new URL(inputText);
        return true;
      } catch (e) {
        console.log(e.message);
        return false; 
      }    
}

export { checkForValidURL }
