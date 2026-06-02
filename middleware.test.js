import { middleware } from './middleware'
import { NextResponse } from 'next/server'

jest.mock('next/server', () => ({
  NextResponse: {
    redirect: jest.fn((url) => ({ status: 307, url: url.toString() })),
    next: jest.fn(() => ({ status: 200 })),
  },
}))

describe('Middleware', () => {
  beforeEach(() => {
    NextResponse.redirect.mockClear()
    NextResponse.next.mockClear()
  })

  it('redirects to login with return path if no token', () => {
    const req = {
      url: 'http://localhost:3000/checkout',
      nextUrl: { pathname: '/checkout' },
      cookies: { get: () => null },
    }

    const res = middleware(req)

    expect(res.status).toBe(307)
    expect(NextResponse.redirect).toHaveBeenCalledWith(
      new URL('/login?redirect=%2Fcheckout', req.url)
    )
  })

  it('allows access if token exists', () => {
    const req = {
      url: 'http://localhost:3000/admin',
      nextUrl: { pathname: '/admin' },
      cookies: { get: () => ({ value: 'token' }) },
    }

    const res = middleware(req)

    expect(res.status).toBe(200)
    expect(NextResponse.next).toHaveBeenCalled()
  })
})
