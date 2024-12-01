import {configureStore} from '@reduxjs/toolkit';
import slice from './slice.ts';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {AppDispatch, State} from '../types/state.ts';


export const store = configureStore({reducer: slice});

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
