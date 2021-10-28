/* eslint-disable prettier/prettier */
import { IResolvers } from "apollo-server";
import fetch from "node-fetch";

import { MercadoLibreSearchResponse, RawProduct, Product, Description } from "./types";

const url = 'https://api.mercadolibre.com/items/'

const resolvers: IResolvers = {
  Query: {
    products: (_, args: { query: string }): Promise<Product[]> =>
      fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${args.query}`)
        .then((res) => res.json())
        .then((response: MercadoLibreSearchResponse) =>
          response.results.slice(0, 10).map((rawProduct) => ({
            id: rawProduct.id,
            title: rawProduct.title,
            image: rawProduct.thumbnail,
            price: rawProduct.price,
            location: rawProduct.address.state_name,
          })),
        ),
    product: async (_, args: { id: string }) => {
      const products = await fetch(`${url}${args.id}`)
      const description = await fetch(`${url}${args.id}/description`)
      const resItems = await products.json();
      const resDescription = await description.json();
      const rawProduct: RawProduct = resItems;
      rawProduct.id = resItems.id
      rawProduct.price = resItems.price
      rawProduct.title = resItems.title
      rawProduct.image = resItems.thumbnail
      rawProduct.location = resItems.seller_address.state.name
      rawProduct.description = resDescription.plain_text
      return rawProduct
    }
  },
};

export default resolvers;
