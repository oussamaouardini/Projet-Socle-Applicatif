import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const addUser = createAsyncThunk(
  'user/fetchUser',
  async (user) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 'nom': user.nom, 'prenom':user.prenom, 'email':user.email, 'gender': user.gender  })
  };
  return fetch('http://localhost:8080/api/users', requestOptions)
      .then(response => response.json())
      .then(data => data);
  }
);

export const fetchUsers = createAsyncThunk(
  'user/fetchUsers',
  async () => {
    var myHeaders = new Headers();
    
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
    method: 'GET', 
    AllowOrigin:'*',
    headers: {
       Accept: 'application/json',
       "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*"
    },
    };
    return fetch(`http://localhost:8080/api/users`, requestOptions)
      .then(response => {
        if (!response.ok) {
          return response.text().then(result => Promise.reject(new Error(result)));
        }
        
        return response.json();
      });
  }
);

export const dropUser = createAsyncThunk(
    'user/dropUser',
    async (id) => {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 'id':id })
        };
        return fetch('http://localhost:8080/api/users/'+id, requestOptions)
            .then(response => response.json())
            .then(data => data);
    }
);



export const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    errors: [],
    status: false,
  },
  reducers: {
  },
  extraReducers: {
    [fetchUsers.pending](state) {
      state.status = true
    },
    [fetchUsers.fulfilled](state, action) {
      let respUser = action.payload;
      console.log(respUser);
      state.users = respUser;
      state.status = false
    },
    [addUser.pending](state) {
      state.status = true
    },
    [addUser.fulfilled](state, action) {
      state.status = false
    },
      [dropUser.pending](state) {
          state.status = true
      },
      [dropUser.fulfilled](state, action) {
          state.status = false
      },
  }
});


export default userSlice.reducer;