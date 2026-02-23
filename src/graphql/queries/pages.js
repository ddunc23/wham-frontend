import { gql } from "@apollo/client";

export const GET_PAGE_BY_SLUG = gql`query Page($slug: String) {
  pages(filters: { Slug: { eq: $slug } }, sort: ["Order:asc"]) {
    Title
    Body
    Photo {
      url
      caption
      alternativeText
    }
  }
}`

export const GET_ALL_PAGES = gql`query Pages {
  pages(sort: ["Order:asc"]) {
    Title
    Slug
    Order
  }
}`