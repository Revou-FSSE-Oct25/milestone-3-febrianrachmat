import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CartProvider, useCart } from '../cartcontext'

function TestComponent() {
  const { cart, addToCart, decreaseQty, removeFromCart, cartTotal, cartCount } = useCart()

  return (
    <div>
      <span data-testid="cart-length">{cart.length}</span>
      <span data-testid="cart-count">{cartCount}</span>
      <span data-testid="cart-total">{cartTotal}</span>

      <button onClick={() => addToCart({ id: 1, price: 10 })}>
        Add
      </button>

      <button onClick={() => decreaseQty(1)}>
        Decrease
      </button>

      <button onClick={() => removeFromCart(1)}>
        Remove
      </button>
    </div>
  )
}

describe('CartContext', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('adds item to cart', async () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )

    expect(screen.getByTestId('cart-length').textContent).toBe('0')

    await userEvent.click(screen.getByText('Add'))

    expect(screen.getByTestId('cart-length').textContent).toBe('1')
    expect(screen.getByTestId('cart-count').textContent).toBe('1')
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
    expect(screen.getByTestId('cart-count').textContent).toBe('0')
  })

  it('increments cartCount when adding the same item twice', async () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )

    await userEvent.click(screen.getByText('Add'))
    await userEvent.click(screen.getByText('Add'))

    expect(screen.getByTestId('cart-length').textContent).toBe('1')
    expect(screen.getByTestId('cart-count').textContent).toBe('2')
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

  it('persists cart to localStorage', async () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )

    await userEvent.click(screen.getByText('Add'))

    expect(JSON.parse(localStorage.getItem('cart'))).toEqual([
      { id: 1, price: 10, quantity: 1 },
    ])
  })

  it('removes item when decreasing quantity from one', async () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    )

    await userEvent.click(screen.getByText('Add'))
    expect(screen.getByTestId('cart-length').textContent).toBe('1')

    await userEvent.click(screen.getByText('Decrease'))

    expect(screen.getByTestId('cart-length').textContent).toBe('0')
    expect(screen.getByTestId('cart-count').textContent).toBe('0')
    expect(screen.getByTestId('cart-total').textContent).toBe('0')
  })

})
