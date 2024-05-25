const formatCash = (x) => Intl.NumberFormat('en-US', {
    notation: "compact",
    maximumFractionDigits: 1,
    style: 'currency',
    currency: 'USD'
}).format(x);

export default formatCash;