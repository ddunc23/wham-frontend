export const GET_ALL_PLACES = gql`query Places($page: Int, $pageSize: Int) {
  places_connection(pagination: { page: $page, pageSize: $pageSize }) {
    nodes {
      Name
      uuid
      BirthPlaceOf {
        uuid
      }
      Lat
      Lon
    }
    pageInfo {
      page
      pageCount
      pageSize
    }
  }
}`