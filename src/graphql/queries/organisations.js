import { gql } from "@apollo/client";

export const GET_ALL_ORGANISATIONS = gql`query Organisation($page: Int, $pageSize: Int, $sort: String) {
    organisations_connection(pagination: { page: $page, pageSize: $pageSize }, sort: [$sort]) {
      nodes {
        documentId
        Name
        attendedByCount
      }
      pageInfo {
        page
        pageCount
        pageSize
      }
    }
  }`

export const GET_ALL_ORGANISATIONS_AND_PEOPLE = gql`query Organisation($page: Int, $pageSize: Int, $sort: String) {
    organisations_connection(pagination: { page: $page, pageSize: $pageSize }, sort: [$sort]) {
      nodes {
        documentId
        Name
        attendedByCount
        attendedBy {
          documentId
        }
      }
      pageInfo {
        page
        pageCount
        pageSize
      }
    }
  }`

export const GET_ORGANISATION_BY_ID = gql`query Organisation($documentId: ID!) {
  organisations(filters:  {
     documentId:  {
        eq: $documentId
     }
  }) {
    documentId
    Name
    hasMembership {
      Type
      hasPersonMember {
        documentId
        FirstName
        Surname
      }
    }
    addresses {
      lat
      lon
      addressString
    }
  }  
}`

export const GET_ORGANISATIONS_BY_ID = gql`query Organisation($documentIds: [ID]) {
  organisations(filters:  {
     documentId:  {
        in: $documentIds
     }
  }) {
    documentId
    Name
    attendedBy {
      documentId
      FirstName
      Surname
    }
  }
}`

