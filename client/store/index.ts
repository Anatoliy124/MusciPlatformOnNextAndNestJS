import { Context, MakeStore, createWrapper } from "next-redux-wrapper";
import { RootState, reducer } from "./reducers";
import { AnyAction, applyMiddleware, createStore } from "redux";
import { ThunkDispatch, thunk } from "redux-thunk";


const makeStore: MakeStore<RootState>
    = (context: Context) => createStore(reducer, applyMiddleware(thunk));

export const wrapper = createWrapper<RootState>(makeStore, {debug: true});

export type NextThunkDispatch = ThunkDispatch<RootState, void, AnyAction>