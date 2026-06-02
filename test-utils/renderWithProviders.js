import { render } from "@testing-library/react";
import { AuthProvider } from "../context/authcontext";
import { CartProvider } from "../context/cartcontext";
import { ToastProvider } from "../context/toastcontext";

export function renderWithProviders(ui) {
  return render(
    <AuthProvider>
      <CartProvider>
        <ToastProvider>{ui}</ToastProvider>
      </CartProvider>
    </AuthProvider>
  );
}
