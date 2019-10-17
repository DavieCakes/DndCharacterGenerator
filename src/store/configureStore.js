import {applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { createBrowserHistory } from 'history'


// import individual reducers
import * as CharacterGenerator from './CharacterGenerator'
import thunk from 'redux-thunk'

function configureStore (history, initialState) {
    const reducers = {
        // name: ImportName.reducer
        characterGenerator: CharacterGenerator.reducer
    }
    
    const middleware = [
        thunk
    ]
    
    // in development, use browser's Redux dev tools extensions if installed
    const enhancers = []
    const isDevelopment = process.env.NODE_ENV === 'development'
    if (isDevelopment && typeof window !== 'undefined' && window.devToolsExtension) {
        enhancers.push(window.devToolsExtension())
    }
    
    const rootReducer = combineReducers({
        ...reducers
    })

    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk, ({getState, dispatch}) => {
            return next => action => {
                const returnValue = next({...action, test: 'test'})

                // retrieve from character store

                if(action.characterId) {
                    console.log('altering character')

                }
                console.log(returnValue, next, action)

                return returnValue
            }
        })
    )
}

const store = configureStore(createBrowserHistory(), window.initialReduxState)
export default store