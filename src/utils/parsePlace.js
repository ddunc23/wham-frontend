export default function parsePlace(place) {
    if (!place || typeof place !== 'object') {
        return {};
    }

    const parsedPlace = {
        id: place.uuid,
        properties: {
            name: place.name
        },
        geometry: place.place_geometry.geometry_json,
        type: 'Feature'
    };

    return parsedPlace;
}