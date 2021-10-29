/* eslint-disable prettier/prettier */
import { IResolvers } from "apollo-server";
import fetch from "node-fetch";

import { MercadoLibreSearchResponse, RawProduct, Description } from "./types";

const url = 'https://api.mercadolibre.com/items/'
const urlProducts = 'https://api.mercadolibre.com/sites/MLA/search?q='

const resolvers: IResolvers = {
  Query: {
    products: async (_, args: { query: string }) => {
      const products = await (await fetch(`${urlProducts}${args.query}`)).json();
      return buildItems(products);
    },
    product: async (_, args: { id: string }) => {
      const product = await (await fetch(`${url}${args.id}`)).json()
      const description = await (await fetch(`${url}${args.id}/description`)).json()
      return buildItem(product, description);
    }
  },
};

const buildItem = (resItem: RawProduct, resDescription: Description) => {
  const rawProduct: RawProduct = resItem;
  rawProduct.id = resItem.id
  rawProduct.price = resItem.price
  rawProduct.title = resItem.title
  rawProduct.image = resItem.thumbnail
  rawProduct.location = resItem.seller_address.state.name
  rawProduct.description = resDescription.plain_text
  return rawProduct;
}

const buildItems = (products: MercadoLibreSearchResponse) => {
  const resultProducts = products.results.map((rawProduct) => ({
    id: rawProduct.id,
    title: rawProduct.title,
    image: rawProduct.thumbnail,
    price: rawProduct.price,
    location: rawProduct.address.state_name,
  }))
  return resultProducts
}

export default resolvers;
