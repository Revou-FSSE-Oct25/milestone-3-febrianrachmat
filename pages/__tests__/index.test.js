import { render, screen } from '@testing-library/react'
import Home, { getStaticProps } from '../index'
import { CartProvider } from '../../context/cartcontext'

const mockProducts = [
  { id: 1, title: 'Product 1', price: 100, image: 'img1.jpg' },
  { id: 2, title: 'Product 2', price: 200, image: 'img2.jpg' },
]

describe('Home Page', () => {
  it('renders with mock data', () => {
    render(
      <CartProvider>
        <Home products={mockProducts} />
      </CartProvider>
    )

    expect(screen.getByText('Product 1')).toBeInTheDocument()
    expect(screen.getByText('Product 2')).toBeInTheDocument()
  })

  it('renders empty state', () => {
    render(
      <CartProvider>
        <Home products={[]} />
      </CartProvider>
    )

    expect(screen.queryByText('Product 1')).not.toBeInTheDocument()
  })
})

describe('getStaticProps', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockProducts),
      })
    )
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('returns products from API', async () => {
    const result = await getStaticProps()

    expect(result).toEqual({
  props: { products: mockProducts },
  revalidate: 60
})
  })
})
