import { applyMiddleware, combineReducers, createStore } from 'redux'
import { createBrowserHistory } from 'history'

// import individual reducers
import * as CharacterGenerator from './CharacterStore'
import thunk from 'redux-thunk'

function configureStore(history, initialState) {
    const reducers = {
        // name: ImportName.reducer
        characterGenerator: CharacterGenerator.reducer
    }

    const myMiddlware = store => next => action => {
        if (action.type == 'test') {
            console.log(store)
            console.log(next)
            console.log(action)
        }
        return next(action)
    }

    const middleware = [
        thunk,
        myMiddlware
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
        applyMiddleware(...middleware)
    )
}

const store = configureStore(createBrowserHistory(), window.initialReduxState)
export default store