import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import sessonReducer from '../features/session/sessionSlice'

export const store = configureStore({
	reducer: {
		counter: counterReducer,
		session: sessonReducer,
	},
})
