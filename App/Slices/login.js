import { createSlice } from '@reduxjs/toolkit'


export const initialState = {
loginObj:{}
}

const loginObjlice = createSlice({
  name: 'loginObj',
  initialState,
  reducers: {
    getloginObj: (state, { payload }) => {
      state.loginObj = payload
      
    },
  
  },
})

export const { getloginObj} = loginObjlice.actions
export const loginObjelector = state => state.loginObj
export default loginObjlice.reducer
