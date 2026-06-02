import { middleware } from './middleware'
import { NextResponse } from 'next/server'

jest.mock('next/server', () => ({
  NextResponse: {
    redirect: jest.fn((url) => ({ status: 307, url: url.toString() })),
    next: jest.fn(() => ({ status: 200 })),
  },
}))

function mockCookies(values = {}) {
  return {
    get: (name) => {
      if (values[name] === undefined) return null
      return { value: values[name] }
    },
  }
}

describe('Middleware', () => {
  beforeEach(() => {
    NextResponse.redirect.mockClear()
    NextResponse.next.mockClear()
  })

  it('redirects to login with return path if no token', () => {
    const req = {
      url: 'http://localhost:3000/checkout',
      nextUrl: { pathname: '/checkout' },
      cookies: mockCookies(),
    }

    const res = middleware(req)

    expect(res.status).toBe(307)
    expect(NextResponse.redirect).toHaveBeenCalledWith(
      new URL('/login?redirect=%2Fcheckout', req.url)
    )
  })

  it('allows checkout access when token exists', () => {
    const req = {
      url: 'http://localhost:3000/checkout',
      nextUrl: { pathname: '/checkout' },
      cookies: mockCookies({ token: 'authenticated' }),
    }

    const res = middleware(req)

    expect(res.status).toBe(200)
    expect(NextResponse.next).toHaveBeenCalled()
  })

  it('redirects non-admin users away from admin routes', () => {
    const req = {
      url: 'http://localhost:3000/admin',
      nextUrl: { pathname: '/admin' },
      cookies: mockCookies({
        token: 'authenticated',
        username: 'john@mail.com',
      }),
    }

    const res = middleware(req)

    expect(res.status).toBe(307)
    expect(NextResponse.redirect).toHaveBeenCalledWith(
      new URL('/', req.url)
    )
  })

  it('allows admin users on admin routes', () => {
    const req = {
      url: 'http://localhost:3000/admin',
      nextUrl: { pathname: '/admin' },
      cookies: mockCookies({
        token: 'authenticated',
        username: 'admin@mail.com',
      }),
    }

    const res = middleware(req)

    expect(res.status).toBe(200)
    expect(NextResponse.next).toHaveBeenCalled()
  })

  it('redirects to login when accessing orders without token', () => {
    const req = {
      url: 'http://localhost:3000/orders',
      nextUrl: { pathname: '/orders' },
      cookies: mockCookies(),
    }

    const res = middleware(req)

    expect(res.status).toBe(307)
    expect(NextResponse.redirect).toHaveBeenCalledWith(
      new URL('/login?redirect=%2Forders', req.url)
    )
  })
})
