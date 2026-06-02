import { render } from "@testing-library/react";
import { AuthProvider } from "../context/authcontext";
import { CartProvider } from "../context/cartcontext";

export function renderWithProviders(ui) {
  return render(
    <AuthProvider>
      <CartProvider>{ui}</CartProvider>
    </AuthProvider>
  );
}
