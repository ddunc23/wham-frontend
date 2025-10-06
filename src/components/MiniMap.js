'use client'

export default function MiniMap(props) {

    return <></>


  /*return (
    <div className="w-full h-full">
      <MapLibreMap
        options={{
            center: props.center.geometry.coordinates,
            style: 'https://wms.wheregroup.com/tileserver/style/osm-bright.json',
            zoom: 7
          }}
        className="w-full h-full"
      />
        <MlGeoJsonLayer
            id="places"
            geojson={{
              type: 'FeatureCollection',
              features: props.features
            }}
            labelOptions={{
              maxzoom: 18,
              minzoom: 5
            }}
            layerId="Circle"
            onClick={() => {}}
            options={{
              paint: {
                'circle-color': '#009EE0',
                'circle-radius': 10
              }
            }}
            type="circle"
        /> 
       

    </div>
  );*/
}