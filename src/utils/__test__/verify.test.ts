import { verify } from "../verify";

test(`verify`, () => {
  expect(
    verify({ currentSpeed: "16" }, [
      {
        currentSpeed: {
          type: "string",
          validator(value) {
            return !Number.isNaN(+value);
          },
        },
      },
    ])
  ).toBeTruthy();

  expect(() =>
    verify({ currentSpeed: "aa" }, [
      {
        currentSpeed: {
          type: "string",
          validator(value) {
            return !Number.isNaN(+value);
          },
        },
      },
    ])
  ).toThrow();
  expect(() =>
    verify({ currentSpeed: 123 }, [
      {
        currentSpeed: {
          type: "string",
          validator(value) {
            return !Number.isNaN(+value);
          },
        },
      },
    ])
  ).toThrowError();
});
