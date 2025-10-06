import { gql } from "@apollo/client";

export const GET_ADDRESSES_WITH_MEMBER_ORGANISATIONS = gql`query Addresses($page: Int, $pageSize: Int, $membershipType: String) {
  addresses_connection(
    filters: {
      organisations: {
        hasMembership: { Type: { eq: $membershipType } }
        employees: { Surname: { notIn: [""] } }
      }
    }
    pagination: { page: $page, pageSize: $pageSize }
  ) {
    nodes {
      lat
      lon
      organisations {
        Name
        hasMembership {
          StartDate
        }
        employees {
          Surname
          FirstName
        }
      }
    }
    pageInfo {
      page
      pageCount
      pageSize
    }
  }
}`