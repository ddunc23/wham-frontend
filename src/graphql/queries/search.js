import { gql } from "@apollo/client";

export const SEARCH_PEOPLE_AND_ORGS = gql`query Search($searchString: String) {
  organisations(filters: { Name: { containsi: $searchString } }) {
    uuid
    Name
    documentId
  }
  people(
    filters: {
      or: [
        { Surname: { containsi: $searchString } }
        { FirstName: { containsi: $searchString } }
      ]
    }
  ) {
    uuid
    FirstName
    Surname
    documentId
  }
}`