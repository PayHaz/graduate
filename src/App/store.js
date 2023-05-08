import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import sessonReducer from '../features/session/sessionSlice'
import cityReducer from '../features/city/citySlice'
import myAdsReducer from '../features/myads/myadsSlice'

export const store = configureStore({
	reducer: {
		counter: counterReducer,
		session: sessonReducer,
		city: cityReducer,
		myAds: myAdsReducer,
	},
})
