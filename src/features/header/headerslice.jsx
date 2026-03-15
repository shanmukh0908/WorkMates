import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showNotificationModel:false,
    showUserModal:false,
}

const headerSlice = createSlice({
  name:"header",
  initialState,
  reducers:{
    toggleshowNotificationModel(state){
        state.showNotificationModel = !state.showNotificationModel
        state.showUserModal = false;
    },
    toggleshowUserModal(state){
        state.showUserModal = !state.showUserModal
        state.showNotificationModel = false;
    },
    showNoModel(state){
        state.showUserModal = false;
        state.showNotificationModel = false;
    }
  }  
})
export const {toggleshowNotificationModel,toggleshowUserModal,showNoModel} = headerSlice.actions
export default headerSlice.reducer