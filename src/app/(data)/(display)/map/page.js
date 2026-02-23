import MapView from "./MapView";

export default async function Page() {

    const data = await fetch(`${process.env.STRAPI_API_URL}/memberships?populate[hasMemberOrganisation][fields][0]=*&populate[hasMemberOrganisation][populate][addresses][fields][0]=*&populate[hasPersonMember][fields][0]=*&pagination[pageSize]=550`, {cache: 'force-cache'});
    const memberships = await data.json();

    const allMemberships = []

    for (let i = 1; i <= memberships.meta.pagination.pageCount; i++) {
        const pageData = await fetch(`${process.env.STRAPI_API_URL}/memberships?populate[hasMemberOrganisation][fields][0]=*&populate[hasMemberOrganisation][populate][addresses][fields][0]=*&populate[hasPersonMember][fields][0]=*&pagination[pageSize]=550&pagination[page]=${i}`, {cache: 'force-cache'});
        const pageMemberships = await pageData.json();
        allMemberships.push(...pageMemberships.data);
    }

    const geojson = {
        type: 'FeatureCollection',
        features: allMemberships.map((m, i) => {
            const address = m.hasMemberOrganisation?.addresses.length > 0 ? m.hasMemberOrganisation.addresses[0] : null;

            if (address === null) {
                return null;
            }

            return {
                geometry: {
                    coordinates: [address.lon, address.lat],
                    type: 'Point'
                },
                id: i,
                properties: {
                    'organisation': m.hasMemberOrganisation?.Name || 'N/A',
                    'membershipType': m.Type || 'N/A',
                    'address': address.addressString || 'N/A',
                    'surname': m.hasPersonMember?.Surname || 'N/A',
                    'firstname': m.hasPersonMember?.FirstName || 'N/A',
                    'personId': m.hasPersonMember?.documentId || null,
                    'organisationId': m.hasMemberOrganisation?.documentId || null,
                    'electionYear': m.StartDate ? m.StartDate.slice(0,4) : 'N/A',
                    'listYear': m.ListYear ? m.ListYear.slice(0,4) : 'N/A',
                    'membershipType': m.Type ? m.Type.replace('_',' ') : 'N/A',
                    'gender': /Miss|Mrs|miss|mrs/.test(m.hasPersonMember?.FirstName) ? 'female' : 'male',
                }
            };
        }).filter(f => f !== null)
    };

    console.log(geojson);

    return (
        <MapView geojson={geojson} />
    )
}