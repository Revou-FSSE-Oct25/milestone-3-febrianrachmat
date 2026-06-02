require("@testing-library/jest-dom");

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: false,
    json: async () => ({}),
  })
);

jest.mock("next/image", () => {
  return function MockImage({ src, alt, fill, priority, sizes, ...props }) {
    void fill;
    void priority;
    void sizes;
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} {...props} />;
  };
});
