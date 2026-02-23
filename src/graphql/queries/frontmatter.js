import { gql } from "@apollo/client";

export const GET_FRONTMATTER = gql`query FrontMatter {
  frontMatter {
    AboutText
    PeopleDescription
    OrgsDescription
    MapDescription
    PeopleImage {
      url
      alternativeText
    }
    OrgsImage {
      url
      alternativeText
    }
    MapImage {
      url
      alternativeText
    }
  }
}`