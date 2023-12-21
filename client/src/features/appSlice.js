import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import Swal from 'sweetalert2'

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        value: 0,
        data: []
    },
    reducers: {
        fetchDataSuccess: (state, action) => {
            state.data = action.payload
        }
    }
})

export const { fetchDataSuccess } = appSlice.actions

export function fetchData() {
    return async function fetchDataThunk(dispatch) {
        try {
            const { data } = await axios({
                method: "get",
                url: `${import.meta.env.VITE_BASE_URL}/myposts`,
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("access_token"),
                },
              });
            dispatch(fetchDataSuccess(data))
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Opps!",
                text: error.response.data.message,
              });
              console.log(error);
        }
    }
}

export default appSlice.reducer