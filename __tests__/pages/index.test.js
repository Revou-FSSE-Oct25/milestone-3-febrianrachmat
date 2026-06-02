import { screen, waitFor } from '@testing-library/react'
import Home from '../../pages/index'
import { renderWithProviders } from '../../test-utils/renderWithProviders'

const mockProducts = [
  {
    id: 1,
    title: "Product 1",
    price: 100,
    image: "https://fakestoreapi.com/img/product-1.jpg",
  },
  {
    id: 2,
    title: "Product 2",
    price: 200,
    image: "https://fakestoreapi.com/img/product-2.jpg",
  },
];

describe('Home Page', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders with mock data', () => {
    renderWithProviders(<Home products={mockProducts} />)

    expect(screen.getByText('Product 1')).toBeInTheDocument()
    expect(screen.getByText('Product 2')).toBeInTheDocument()
  })

  it('does not require login to browse products', () => {
    localStorage.clear()

    renderWithProviders(<Home products={mockProducts} />)

    expect(screen.getByText('RevoShop Products')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Login' })).toBeInTheDocument()
  })

  it('renders empty state', () => {
    renderWithProviders(<Home products={[]} />)

    expect(screen.queryByText('Product 1')).not.toBeInTheDocument()
  })

  it('renders layout with auth and cart providers', () => {
    renderWithProviders(<Home products={mockProducts} />)

    expect(screen.getByText('RevoShop')).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Cart" })).toHaveAttribute("href", "/cart");
    expect(screen.getByRole('link', { name: 'Login' })).toHaveAttribute('href', '/login')
  })

  it('shows cart badge when cart has items in localStorage', async () => {
    localStorage.setItem(
      'cart',
      JSON.stringify([{ id: 1, price: 100, quantity: 2 }])
    )

    renderWithProviders(<Home products={mockProducts} />)

    await waitFor(() => {
      expect(screen.getByText('2')).toBeInTheDocument()
    })
  })
})

describe('getStaticProps', () => {
  beforeEach(() => {
    jest.resetModules()
    jest.doMock('../../lib/products-data', () => ({
      bootstrapProducts: jest.fn().mockResolvedValue(undefined),
      getProducts: jest.fn(() => mockProducts),
    }))
  })

  afterEach(() => {
    jest.dontMock('../../lib/products-data')
    jest.resetModules()
  })

  it('returns products from shared product store', async () => {
    const { getStaticProps } = await import('../../pages/index')
    const result = await getStaticProps()

    expect(result).toEqual({
      props: { products: mockProducts },
      revalidate: 60,
    })
  })
})
