import axios from 'axios'; 
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


export const createUser = createAsyncThunk(
    'createUser',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                "https://66f4ea7c77b5e889709ada9c.mockapi.io/crud",
                data,
                {
                    headers: {
                        'Content-Type': "application/json",
                    }
                }
            );

            
            if (response.status !== 200 && response.status !== 201) {
                throw new Error(response.data.message || 'Failed to create user');
            }

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message || 'Something went wrong');
        }
    }
);

export const showUser = createAsyncThunk(
    "showUser",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('https://66f4ea7c77b5e889709ada9c.mockapi.io/crud');

            if (response.status !== 200 && response.status !== 201) {
                throw new Error(response.data.message || 'Failed to read user');
            }
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

export const updateUser = createAsyncThunk(
    "updateUser",
    async (updatedUser, { rejectWithValue }) => {
        const { id, name, email, age, gender } = updatedUser;

        try {
            const response = await axios.put(
                `https://66f4ea7c77b5e889709ada9c.mockapi.io/crud/${id}`,
                { name, email, age, gender },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );

            if (response.status !== 200 && response.status !== 201) {
                throw new Error(response.data.message || 'Failed to update user');
            }

            return response.data; 
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message || 'Something went wrong');
        }
    }
);
export const deleteUser = createAsyncThunk(
    "deleteUser",
    async (id, { rejectWithValue }) => {
      try {
        const response = await axios.delete(
          `https://66f4ea7c77b5e889709ada9c.mockapi.io/crud/${id}`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        
        if (response.status !== 200 && response.status !== 201) {
          throw new Error(response.data.message || 'Failed to delete user');
        }
        
      
        return { id };
      } catch (error) {
        return rejectWithValue(error.message || "Something went wrong");
      }
    }
  );
  

// Create slice
export const userDetails = createSlice({
    name: 'userDetails',
    initialState: {
        users: [],
        loading: false,
        error: null,
        searchData:"",
    },
    reducers: {
        searchUser:(state,action)=>{
            state.searchData=action.payload
        }
    }, 
    extraReducers: (builder) => {
        builder
            .addCase(createUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users.push(action.payload); 
            })
            .addCase(createUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(showUser.pending, (state)=>{
                state.loading=true;
            })
            .addCase(showUser.fulfilled, (state,action)=>{
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(showUser.rejected, (state,action)=>{
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
                state.error = null;  
              })
              .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                const { id } = action.payload;
                if (id) {
                  state.users = state.users.filter((user) => user.id !== id);
                }
              })
              .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;  
              })
            .addCase(updateUser.pending, (state)=>{
                state.loading=true;
            })
            .addCase(updateUser.fulfilled, (state,action)=>{
                state.loading=false;
                const index = state.users.findIndex((user)=>user.id===action.payload.id)
                if (index !== -1){
                    state.users[index]=action.payload
                }
            })
            .addCase(updateUser.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.payload;
            });
    }
});

export default userDetails.reducer;

export const {searchUser}=userDetails.actions
