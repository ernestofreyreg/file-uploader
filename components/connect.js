import React, {Component} from 'react'

const connect = (component, actionCreator, initialState)  => {
  const attach = instance => ({
    set: fn => new Promise(resolve => instance.setState(fn, resolve)),
    get: () => instance.state
  })

  return class Connected extends Component {
    constructor(props, context) {
      super(props, context)

      this.state = initialState
      this.actions = actionCreator(attach(this))
    }

    render () {
      return React.createElement(component, {...this.props,...this.actions, ...this.state})
    }
  }
}

export default connect
