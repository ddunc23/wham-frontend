import { gql } from "@apollo/client";

export const GET_ADDRESSES_WITH_MEMBER_ORGANISATIONS = gql`query Addresses($page: Int, $pageSize: Int, $membershipType: String) {
  addresses_connection(
    filters: {
      organisations: {
        hasMembership: { Type: { eq: $membershipType } }
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
          ListYear
          Type
          MemberInstitutionalRole
          hasPersonMember {
            FirstName
            Surname
          }
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

export const GET_ADDRESSES_INSTITUITIONAL_MEMBERS = gql`query Addresses($page: Int, $pageSize: Int, $membershipType: String, $role: String) {
  addresses_connection(
    pagination: { page: $page, pageSize: $pageSize }
    filters:  {
       organisations:  {
          hasMembership:  {
             Type:  {
                eq: $membershipType
             }
          }
       }
    }
  ) {
    nodes {
      lat
      lon
      organisations {
        uuid
        Name
        hasMembership_connection(
          filters:  {
             Type:  {
                eq: $membershipType
             }
          }) {
            nodes {
              StartDate
              ListYear
              Type
            }
        }
        Employees_connection(filters:  {
           Role:  {
              eq: $role
           }
        }) {
          nodes {
            Person {
              FirstName
              Surname
              uuid
            }
            Role
          }
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