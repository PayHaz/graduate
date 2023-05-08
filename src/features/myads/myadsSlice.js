import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	value: null,
}

export const myadsSlice = createSlice({
	name: 'myads',
	initialState,
	reducers: {
		setMyAds: (state, action) => {
			state.value = action.payload
		},
	},
})

export const { setMyAds } = myadsSlice.actions

export default myadsSlice.reducer
