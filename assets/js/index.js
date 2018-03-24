var React = require('react')
var ReactDom = require('react-dom')
import App from './App'
import { AppContainer } from 'react-hot-loader';

const render = Component => {
    ReactDom.render(
      <AppContainer>
        <Component />
      </AppContainer>,
      document.getElementById('react-app')
    )
  }

  render(App)
  
  if (module.hot) {
    module.hot.accept(() => { render(App) })
  }

