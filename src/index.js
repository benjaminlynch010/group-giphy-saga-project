import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import axios from 'axios'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import { takeEvery, put } from 'redux-saga/effects'


function* sendSearch (action) {
  // 3. send search takes the dispatch from 'SAGA_FETCH_SEARCH', and supplying the function with the search term.
  try{
      // 4. assigns the term to the searchQuery variable.
      const searchQuery = action.payload;
      // 5. set params with the variable of searchQuery as an object.
      const response = yield  axios({
          method:  'GET',
          url: '/api/favorite/search',
          params: {searchQuery}
      })
      // Send GIF data to results reducer
   yield put ({
      // 9. this sets the state of the reducer with the corresponding type.
      type: 'SET_GIF_LIST',
      payload: response
      })
  }catch (error){
      console.log(`sendSearch broke POST saga index`, error);
  }
}

function* fetchGifs () {
  try{
      const response = yield  axios({
          method:  'GET',
          url: '/api/favorite'
      })
   yield put ({
      type: 'SET_STATE',
      payload: response.data
      })
  }catch (error){
      console.log(`fetch gif broke GET saga index`, error);
  }
}



const favorites = (state = [], action) => {
  switch (action.type) {
      case 'SET_STATE':
          return action.payload;
      default:
          return state;
  }
}

// function* rootSaga() {
//   yield takeLatest('GET_GIFS', fetchGifList)
// }

// function* fetchGifList() {
//   const gifList = yield axios.get('/api/category')
//   yield put ({ type: 'SET_GIF_LIST', payload: gifList.data})
// }

const gifReducer = ( state = [], action ) => {
  switch(action.type) {
    case 'SET_GIF_LIST':
      return action.payload.data
    default: 
      return state
  }
}

// Creates generator 
function* rootSaga(){
  yield  takeEvery('SAGA_FETCH_GIFS', fetchGifs)
  // 2. sendSearch listens for 'SAGA_FETCH_SEARCH' and then sendSearch gets called
  yield  takeEvery('SAGA_FETCH_SEARCH', sendSearch)
}


const sagaMiddleware = createSagaMiddleware()

const storeInstance = createStore(
  combineReducers({ 
    gifReducer,
    favorites
  }),
  applyMiddleware( sagaMiddleware, logger )
)

sagaMiddleware.run(rootSaga)



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      <Provider store={storeInstance}>
        <App />
      </Provider>
    </React.StrictMode>
);
