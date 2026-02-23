import { gql } from "@apollo/client";

export const GET_PERSON_BY_ID = gql`
    query Person($documentId: ID) {
        people(filters: { 
            documentId:  {
                eq: $documentId
            }
        }) 
        {
            documentId
            FirstName
            Surname
            DateOfBirth
            DateOfDeath
            uuid
        }
    }`

export const GET_PERSON_BY_ID_DEEP = gql`
    query Person($documentId: ID) {
        people(filters: { 
            documentId:  {
                eq: $documentId
            }
        }) 
        {
            documentId
            FirstName
            Surname
            DateOfBirth
            DateOfDeath
            uuid
            Bio
            Photo {
                url
                caption
                alternativeText
            }
            memberships {
                ListYear
                StartDate
                Type
                hasMemberOrganisation {
                    documentId
                    Name
                    uuid
                }
            }
            addresses {
                lat
                lon
                addressString
            }
        }
    }`


export const GET_ALL_PEOPLE = gql`query People($page: Int, $pageSize: Int, $sort: [String], $filters: PersonFiltersInput) {
        people_connection(
          pagination: { page: $page, pageSize: $pageSize }, sort: $sort
          filters: $filters
          ) {
            nodes {
                documentId
                uuid
                FirstName
                Surname
                memberships {
                  ListYear
                  StartDate
                  hasMemberOrganisation {
                    uuid
                    Name
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