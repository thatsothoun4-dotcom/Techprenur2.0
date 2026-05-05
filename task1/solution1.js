function groupAndAggregate(data) {
  if (!Array.isArray(data) || data.length === 0) return {};

  const groups = {};

  for (const { region, product, revenue, orders } of data) {
    if (!groups[region]) {
      groups[region] = {
        totalRevenue: 0,
        totalOrders: 0,
        products: {},
      };
    }

    groups[region].totalRevenue += revenue;
    groups[region].totalOrders += orders;
    groups[region].products[product] =
      (groups[region].products[product] || 0) + revenue;
  }

  const result = {};

  for (const region in groups) {
    const { totalRevenue, totalOrders, products } = groups[region];

    const topProduct = Object.keys(products).reduce((best, current) =>
      products[current] > products[best] ? current : best
    );

    result[region] = {
      totalRevenue: totalRevenue,
      avgOrderValue: parseFloat((totalRevenue / totalOrders).toFixed(2)),
      topProduct: topProduct,
    };
  }

  return result;
}

module.exports = groupAndAggregate;

const data = [
  { region: 'Asia', product: 'Widget A', revenue: 4200, orders: 14 },
  { region: 'Asia', product: 'Widget B', revenue: 1800, orders: 6  },
  { region: 'Asia', product: 'Widget C', revenue: 3300, orders: 11 },
  { region: 'EU',   product: 'Widget A', revenue: 3100, orders: 10 },
  { region: 'EU',   product: 'Widget C', revenue: 5400, orders: 18 },
  { region: 'EU',   product: 'Widget D', revenue: 920,  orders: 4  },
];

console.log(groupAndAggregate(data));