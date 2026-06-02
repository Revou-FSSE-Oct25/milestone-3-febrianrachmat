import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ToastProvider, useToast } from "../toastcontext";

function TestComponent() {
  const { showToast } = useToast();

  return (
    <button type="button" onClick={() => showToast("Test message")}>
      Show Toast
    </button>
  );
}

describe("ToastContext", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  });

  it("shows toast message when triggered", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    await user.click(screen.getByText("Show Toast"));

    expect(screen.getByRole("status")).toHaveTextContent("Test message");
  });

  it("dismisses toast when close button is clicked", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    await user.click(screen.getByText("Show Toast"));
    expect(screen.getByRole("status")).toBeInTheDocument();

    await user.click(screen.getByLabelText("Dismiss notification"));

    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("hides toast after timeout", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    await user.click(screen.getByText("Show Toast"));
    expect(screen.getByRole("status")).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(4000);
    });

    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });
});
