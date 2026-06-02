import { render } from "@testing-library/react";
import { AuthProvider } from "../context/authcontext";
import { CartProvider } from "../context/cartcontext";
import { ToastProvider } from "../context/toastcontext";
import { ThemeProvider } from "../context/themecontext";

export function renderWithProviders(ui) {
  return render(
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <ToastProvider>{ui}</ToastProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
