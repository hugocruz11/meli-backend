// Resolvers
export interface RawProductSearch {
  id: string;
  title: string;
  price: number;
  thumbnail: string;
  address: {
    state_name: string;
  };
}

export interface RawProduct {
  id: string;
  title: string;
  price: number;
  thumbnail: string;
  image: string;
  description: string;
  location: string;
  seller_address: {
    state: {
      name: string;
    };
  };
}

export interface Description {
  plain_text: string;
}

export interface MercadoLibreSearchResponse {
  results: RawProductSearch[];
}

// Interfaces
export interface Product {
  id: string;
  image: string;
  price: number;
  title: string;
  location: string;
}
