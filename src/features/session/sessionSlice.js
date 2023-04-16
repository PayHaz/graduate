import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	value: '',
}

export const sessionSlice = createSlice({
	name: 'session',
	initialState,
	reducers: {
		setToken: (state, action) => {
			state.value = action.payload
		},
		deleteToken: (state) => {
			state.value = ''
		},
	},
})

export const { setToken, deleteToken } = sessionSlice.actions

export default sessionSlice.reducer
