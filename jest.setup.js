require("@testing-library/jest-dom");

jest.mock("next/image", () => {
  return function MockImage({ src, alt, fill, priority, sizes, ...props }) {
    void fill;
    void priority;
    void sizes;
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} {...props} />;
  };
});
