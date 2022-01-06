function handleSubmit(event) {
    event.preventDefault()
    let formText = document.getElementById('url').value;
    // Check for valid URL, and submit form
    if (Client.checkForValidURL(formText)) {
      console.log("::: Form Submitted :::");
      postData('http://localhost:8081/addData', {ft: formText})
      .then(() => updateUI())
    }
    else {
      alert("Please enter a valid URL");
    }

}

// Async POST
const postData = async ( url = '', data = {})=> {
    console.log(data);
    const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  })
    try {
      console.log(response)
      const newData = await response.json();
      console.log(newData)
      return newData;
    } catch(error) {
    console.log("error", error);
    }
};


// Update UI Elements
const updateUI = async () => {
  const request = await fetch('http://localhost:8081/all');
  try {
    const res = await request.json();
    console.log(res)
    document.getElementById('score_tag').innerHTML = res.data.score_tag;
    document.getElementById('agreement').innerHTML = res.data.agreement;
    document.getElementById('subjectivity').innerHTML = res.data.subjectivity;
    document.getElementById('confidence').innerHTML = res.data.confidence;
    document.getElementById('irony').innerHTML = res.data.irony;
  } catch(error) {
    console.log("error", error);
  }
}

export { handleSubmit }
