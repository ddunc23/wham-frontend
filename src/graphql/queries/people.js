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
            attended {
              documentId
              Name
              hasParentOrganisation {
                Name
              }
            }
        }
    }`


export const GET_ALL_PEOPLE = gql`
    query People($page: Int, $pageSize: Int) {
        people_connection(pagination: { page: $page, pageSize: $pageSize }, sort: "Surname:asc" ) {
            nodes {
                documentId
                uuid
                FirstName
                Surname  
            }
            pageInfo {
                page
                pageCount
                pageSize
            }
        }
    }`