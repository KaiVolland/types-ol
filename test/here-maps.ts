import Map from 'ol/Map';
import View from 'ol/View';
import { Layer } from 'ol/layer';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';

const appId = 'kDm0Jq1K4Ak7Bwtn8uvk';
const appCode = 'xnmvc4dKZrDfGlvQHXSvwQ';
const hereLayers = [
    {
        base: 'base',
        type: 'maptile',
        scheme: 'normal.day',
        app_id: appId,
        app_code: appCode,
    },
    {
        base: 'base',
        type: 'maptile',
        scheme: 'normal.day.transit',
        app_id: appId,
        app_code: appCode,
    },
    {
        base: 'base',
        type: 'maptile',
        scheme: 'pedestrian.day',
        app_id: appId,
        app_code: appCode,
    },
    {
        base: 'aerial',
        type: 'maptile',
        scheme: 'terrain.day',
        app_id: appId,
        app_code: appCode,
    },
    {
        base: 'aerial',
        type: 'maptile',
        scheme: 'satellite.day',
        app_id: appId,
        app_code: appCode,
    },
    {
        base: 'aerial',
        type: 'maptile',
        scheme: 'hybrid.day',
        app_id: appId,
        app_code: appCode,
    },
];
const urlTpl =
    'https://{1-4}.{base}.maps.cit.api.here.com' +
    '/{type}/2.1/maptile/newest/{scheme}/{z}/{x}/{y}/256/png' +
    '?app_id={app_id}&app_code={app_code}';
const layers: Layer[] = [];
for (const layerDesc of hereLayers) {
    layers.push(
        new TileLayer({
            visible: false,
            preload: Infinity,
            source: new XYZ({
                url: createUrl(urlTpl, layerDesc),
                attributions:
                    'Map Tiles &copy; ' +
                    new Date().getFullYear() +
                    ' ' +
                    '<a href="http://developer.here.com">HERE</a>',
            }),
        }),
    );
}

const map = new Map({
    layers,
    // Improve user experience by loading tiles while dragging/zooming. Will make
    // zooming choppy on mobile or slow devices.
    loadTilesWhileInteracting: true,
    target: 'map',
    view: new View({
        center: [921371.9389, 6358337.7609],
        zoom: 10,
    }),
});

function createUrl(tpl: string, layerDesc: any) {
    return tpl
        .replace('{base}', layerDesc.base)
        .replace('{type}', layerDesc.type)
        .replace('{scheme}', layerDesc.scheme)
        .replace('{app_id}', layerDesc.app_id)
        .replace('{app_code}', layerDesc.app_code);
}

const select = document.getElementById('layer-select') as HTMLSelectElement;
function onChange() {
    const scheme = select.value;
    for (let j = 0, jj = layers.length; j < jj; ++j) {
        layers[j].setVisible(hereLayers[j].scheme === scheme);
    }
}
select.addEventListener('change', onChange);
onChange();
