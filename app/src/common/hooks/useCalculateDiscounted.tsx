export const calculateDiscountedPrice = (
    price: number,
    discount: number
): number => {
    const discountedPrice = price - (price * discount) / 100;
    return Number(discountedPrice.toFixed(3).replace(/\.?0+$/, ""));
};
