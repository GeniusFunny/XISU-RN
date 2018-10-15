import {Provider} from 'react-redux'
import React from 'react'

const WithStore = (Container, store) => {
  return class extends React.Component {
    render() {
      return (
        <Provider store={store()}>
          <Container/>
        </Provider>
        )
    }
  }
}
export default WithStore
