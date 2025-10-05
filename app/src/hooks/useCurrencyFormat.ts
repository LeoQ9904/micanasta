// Hook para formatear un número a moneda
import { useCallback } from "react";

export type CurrencyFormatOptions = {
    locale?: string;
    currency?: string;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
};

export function useCurrencyFormat(options?: CurrencyFormatOptions) {
    const {
        locale = "es-CO",
        currency = "COP",
        minimumFractionDigits = 0,
        maximumFractionDigits = 0,
    } = options || {};

    const format = useCallback(
        (value: number | string) => {
            const numberValue =
                typeof value === "string" ? parseFloat(value) : value;
            if (isNaN(numberValue)) return "";
            return numberValue.toLocaleString(locale, {
                style: "currency",
                currency,
                minimumFractionDigits,
                maximumFractionDigits,
            });
        },
        [locale, currency, minimumFractionDigits, maximumFractionDigits]
    );

    return format;
}

// Ejemplo de uso:
// const formatCurrency = useCurrencyFormat({ currency: "USD" });
// formatCurrency(12345.67); // "$12,345.67"
