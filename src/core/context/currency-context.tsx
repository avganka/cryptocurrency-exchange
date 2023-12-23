import { ReactNode, createContext, useState } from 'react';
import { Currency } from '../types/currency';

const DEFAULT_CURRENCY = {
  ticker: 'BTC',
  name: 'Bitcoin',
  image: '',
  hasExternalId: false,
  isFiat: false,
  featured: false,
  isStable: false,
  supportsFixedRate: false
};

export interface CurrencyContextType {
  currencies: Currency[];
  inputCurrency: Currency;
  setInputCurrency: (currency: Currency) => void;
  outputCurrency: Currency;
  setOutputCurrency: (currency: Currency) => void;
  minValue: number;
}

export const CurrencyContext = createContext<CurrencyContextType>({
  currencies: [],
  inputCurrency: DEFAULT_CURRENCY,
  setInputCurrency: () => {},
  outputCurrency: DEFAULT_CURRENCY,
  setOutputCurrency: () => {},
  minValue: 0;
});

interface CurrencyContextProps {
  children: ReactNode;
  currencies: Currency[];
}

export const CurrencyProvider = ({ children, currencies }: CurrencyContextProps) => {
  const [inputCurrency, setInputCurrency] = useState(currencies.length > 0 ? currencies[0] : DEFAULT_CURRENCY);
  const [outputCurrency, setOutputCurrency] = useState(currencies.length > 0 ? currencies[0] : DEFAULT_CURRENCY);

  const minValue = 0

  return (
    <CurrencyContext.Provider
      value={{
        currencies,
        inputCurrency,
        setInputCurrency,
        outputCurrency,
        setOutputCurrency,
        minValue
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};
