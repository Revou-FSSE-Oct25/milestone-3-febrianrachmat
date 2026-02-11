import { middleware } from './middleware'

jest.mock('next/server', () => ({
  NextResponse: {
    redirect: jest.fn(() => ({ status: 307 })),
    next: jest.fn(() => ({ status: 200 })),
  },
}))

describe('Middleware', () => {
  it('redirects if no token', () => {
    const req = {
      url: 'http://localhost:3000/admin',
      nextUrl: { pathname: '/admin' },
      cookies: { get: () => null },
    }

    const res = middleware(req)

    expect(res.status).toBe(307)
  })

  it('allows access if token exists', () => {
    const req = {
      url: 'http://localhost:3000/admin',
      nextUrl: { pathname: '/admin' },
      cookies: { get: () => ({ value: 'token' }) },
    }

    const res = middleware(req)

    expect(res.status).toBe(200)
  })
})
