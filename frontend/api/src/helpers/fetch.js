export const post = async ({ url, body, success, failure, dispatch }) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: body
    });
    const json = await response.json();
    console.log(json);

    
    dispatch({ type: success, json })
  } catch (err) {
    
    dispatch({ type: failure })
  }
}

export const postAuth = async ({ url, token, body, success, failure, dispatch }) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
      body: body
    });
    const json = await response.json();
    console.log(json);    
    dispatch({ type: success, json })
  } catch (err) {
    
    dispatch({ type: failure })
  }
}

export const getAuth = async ({ url, token, success, failure, dispatch }) => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      }
    });
    const json = await response.json();

    dispatch({ type: success, json })
  } catch (err) {
    
    dispatch({ type: failure })
  }
}

