import { gql } from '@apollo/client';

export const INSTITUTIONAL_MEMBERSHIPS = gql`query InstitutionalMemberships($page: Int, $pageSize: Int) {
  memberships_connection(
    pagination:  {
       page: $page,
       pageSize: $pageSize
    }
    filters:  {
       Type:  {
          eq: "Institutional Member"
       }
    }
  ) {
    nodes {
      Type
      MemberInstitutionalRole
      hasMemberOrganisation {
        Name
        addresses {
          addressString
          lat
          lon
        }
      }
      hasPersonMember {
        FirstName
        Surname
      }
    }
  }
}`

export const PERSONAL_MEMBERSHIPS = gql`query PersonalMemberships($page: Int, $pageSize: Int) {
  memberships_connection(
    pagination:  {
       page: $page,
       pageSize: $pageSize
    }
    filters:  {
       Type:  {
          ne: "Institutional Member"
       }
    }
  ) {
    nodes {
      Type
      StartDate
      ListYear
      hasPersonMember {
        FirstName
        Surname
        addresses {
          addressString
          lat
          lon
        }
      }
      hasMemberOrganisation {
        Name
        addresses {
          addressString
          lat
          lon
        }
      }
    }
  }
}`


export const ALL_MEMBERSHIPS = gql`query AllMemberships($page: Int, $pageSize: Int) {
  memberships_connection(
    pagination:  {
       page: $page,
       pageSize: $pageSize
    }
  ) {
    nodes {
      Type
      StartDate
      ListYear
      hasPersonMember {
        FirstName
        Surname
        addresses {
          addressString
          lat
          lon
        }
      }
      hasMemberOrganisation {
        Name
        addresses {
          addressString
          lat
          lon
        }
      }
    }
  }
}`