import Map from 'ol/Map';
import View from 'ol/View';
import { Extent } from 'ol/extent';
import TileLayer from 'ol/layer/Tile';
import { transformExtent } from 'ol/proj';
import TileJSON from 'ol/source/TileJSON';

function transform(extent: Extent) {
    return transformExtent(extent, 'EPSG:4326', 'EPSG:3857');
}

const extents: { [key: string]: Extent } = {
    India: transform([68.17665, 7.96553, 97.40256, 35.49401]),
    Argentina: transform([-73.41544, -55.25, -53.62835, -21.83231]),
    Nigeria: transform([2.6917, 4.24059, 14.57718, 13.86592]),
    Sweden: transform([11.02737, 55.36174, 23.90338, 69.10625]),
};

const base = new TileLayer({
    source: new TileJSON({
        url: 'https://api.tiles.mapbox.com/v3/mapbox.world-light.json?secure',
        crossOrigin: 'anonymous',
    }),
});

const overlay = new TileLayer({
    extent: extents.India,
    source: new TileJSON({
        url: 'https://api.tiles.mapbox.com/v3/mapbox.world-black.json?secure',
        crossOrigin: 'anonymous',
    }),
});

const map = new Map({
    layers: [base, overlay],
    target: 'map',
    view: new View({
        center: [0, 0],
        zoom: 1,
    }),
});

for (const key in extents) {
    (document.getElementById(key) as HTMLElement).onclick = event => {
        overlay.setExtent(extents[(event.target as HTMLElement).id]);
    };
}
