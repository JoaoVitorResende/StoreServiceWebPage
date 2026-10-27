import type { PaymentType } from "./types";

export const PAYMENT_LABELS: Record<PaymentType, string> = {
  Cash: "Dinheiro",
  CreditCard: "Cartão de crédito",
  DebitCard: "Cartão de débito",
  EletronicTransfer: "Transferência eletrônica",
};