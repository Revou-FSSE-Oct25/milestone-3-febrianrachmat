import { render, screen } from '@testing-library/react'

function Button({ text }) {
  return <button>{text}</button>
}

describe('Button Component', () => {
  it('renders button text', () => {
    render(<Button text="Click Me" />)
    expect(screen.getByText('Click Me')).toBeInTheDocument()
  })
})
