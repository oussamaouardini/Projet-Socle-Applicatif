import fetch from 'unfetch/src'

const checkStatus = response =>{
    if (response.ok) {
        return response;
      }
      // convert non-2xx HTTP responses into errors:
      const error = new Error(response.statusText);
      error.response = response;
      return Promise.reject(error);
}

export const getAllUsers = () =>   
                                fetch("http://localhost:8080/api/users")
                                .then(checkStatus);