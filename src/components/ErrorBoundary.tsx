import React, { Component, ErrorInfo } from 'react'

type Props = { children: React.ReactNode }
type State = { error: Error | null }

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Uncaught error:', error, info)
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-stone-50 px-6">
          <div className="text-center max-w-md">
            <h1 className="text-2xl font-bold text-stone-900 mb-3">Something went wrong</h1>
            <p className="text-stone-500 text-sm mb-6">{this.state.error.message}</p>
            <button
              className="btn-primary"
              onClick={() => this.setState({ error: null })}
            >
              Try again
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
