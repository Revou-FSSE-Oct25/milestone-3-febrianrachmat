import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CartProvider, useCart } from '../cartcontext'

function TestComponent() {
  const { cart, addToCart, removeFromCart, cartTotal } = useCart()

  return (
    <div>
      <span data-testid="cart-length">{cart.length}</span>
      <span data-testid="cart-total">{cartTotal}</span>

      <button onClick={() => addToCart({ id: 1, price: 10 })}>
        Add
      </button>

      <button onClick={() => removeFromCart(1)}>
        Remove
      </button>
    </div>
  )
}

describe('CartContext', () => {

  it('adds item to cart', async () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )

    expect(screen.getByTestId('cart-length').textContent).toBe('0')

    await userEvent.click(screen.getByText('Add'))

    expect(screen.getByTestId('cart-length').textContent).toBe('1')
  })

  it('removes item from cart', async () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )

    await userEvent.click(screen.getByText('Add'))
    expect(screen.getByTestId('cart-length').textContent).toBe('1')

    await userEvent.click(screen.getByText('Remove'))
    expect(screen.getByTestId('cart-length').textContent).toBe('0')
  })

  it('calculates cart total correctly', async () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )

    await userEvent.click(screen.getByText('Add'))

    expect(screen.getByTestId('cart-total').textContent).toBe('10')
  })

})
