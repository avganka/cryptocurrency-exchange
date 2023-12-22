import { Currency } from './core/types/currency';

export const CURRENCIES: Currency[] = [
  {
    ticker: 'btc',
    name: 'Bitcoin',
    image: 'https://content-api.changenow.io/uploads/btc_1_527dc9ec3c.svg',
    hasExternalId: false,
    isFiat: false,
    featured: true,
    isStable: false,
    supportsFixedRate: true
  },
  {
    ticker: 'eth',
    name: 'Ethereum',
    image: 'https://content-api.changenow.io/uploads/eth_f4ebb54ec0.svg',
    hasExternalId: false,
    isFiat: false,
    featured: true,
    isStable: false,
    supportsFixedRate: true
  },
  {
    ticker: 'ethbsc',
    name: 'Ethereum (Binance Smart Chain)',
    image: 'https://content-api.changenow.io/uploads/ethbsc_ef444521c5.svg',
    hasExternalId: false,
    isFiat: false,
    featured: false,
    isStable: false,
    supportsFixedRate: true
  },
  {
    ticker: 'etharb',
    name: 'Ethereum (Arbitrum)',
    image: 'https://content-api.changenow.io/uploads/etharbitrum_796401be67.svg',
    hasExternalId: false,
    isFiat: false,
    featured: false,
    isStable: false,
    supportsFixedRate: true
  },
  {
    ticker: 'ethop',
    name: 'Ethereum (Optimism)',
    image: 'https://content-api.changenow.io/uploads/ethop_044f371b26.svg',
    hasExternalId: false,
    isFiat: false,
    featured: false,
    isStable: false,
    supportsFixedRate: true
  },
  {
    ticker: 'zksync',
    name: 'Ethereum (ZkSync Era)',
    image: 'https://content-api.changenow.io/uploads/ethzksync_f642b927a7.svg',
    hasExternalId: false,
    isFiat: false,
    featured: false,
    isStable: false,
    supportsFixedRate: true
  },
  {
    ticker: 'ethbase',
    name: 'Ethereum (Base)',
    image: 'https://content-api.changenow.io/uploads/ethbase_42ce14857a.svg',
    hasExternalId: false,
    isFiat: false,
    featured: false,
    isStable: false,
    supportsFixedRate: true
  },
  {
    ticker: 'usdterc20',
    name: 'Tether (ERC20)',
    image: 'https://content-api.changenow.io/uploads/usdterc20_5ae21618aa.svg',
    hasExternalId: false,
    isFiat: false,
    featured: true,
    isStable: true,
    supportsFixedRate: true
  },
  {
    ticker: 'usdttrc20',
    name: 'Tether (TRC20)',
    image: 'https://content-api.changenow.io/uploads/usdttrc20_87164a7b35.svg',
    hasExternalId: false,
    isFiat: false,
    featured: false,
    isStable: true,
    supportsFixedRate: true
  },
  {
    ticker: 'usdtbsc',
    name: 'Tether (Binance Smart Chain)',
    image: 'https://content-api.changenow.io/uploads/usdtbsc_b8f3d8f316.svg',
    hasExternalId: false,
    isFiat: false,
    featured: false,
    isStable: true,
    supportsFixedRate: true
  },
  {
    ticker: 'usdtsol',
    name: 'Tether (SOL)',
    image: 'https://content-api.changenow.io/uploads/usdtsol_4f6a1c5208.svg',
    hasExternalId: false,
    isFiat: false,
    featured: false,
    isStable: true,
    supportsFixedRate: true
  },
  {
    ticker: 'usdtmatic',
    name: 'Tether (Polygon)',
    image: 'https://content-api.changenow.io/uploads/usdtmatic_7f0d789259.svg',
    hasExternalId: false,
    isFiat: false,
    featured: false,
    isStable: true,
    supportsFixedRate: true
  }
];
