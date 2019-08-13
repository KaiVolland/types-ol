import { Feature } from 'ol';
import Map from 'ol/Map';
import View from 'ol/View';
import EsriJSON from 'ol/format/EsriJSON';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { tile as tileStrategy } from 'ol/loadingstrategy';
import { fromLonLat } from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import XYZ from 'ol/source/XYZ';
import { Fill, Stroke, Style } from 'ol/style';
import { createXYZ } from 'ol/tilegrid';

declare var $: any;

const serviceUrl = 'https://sampleserver3.arcgisonline.com/ArcGIS/rest/services/' + 'Petroleum/KSFields/FeatureServer/';
const layer = '0';

const esrijsonFormat = new EsriJSON();

const styleCache: { [key: string]: Style } = {
    ABANDONED: new Style({
        fill: new Fill({
            color: 'rgba(225, 225, 225, 255)',
        }),
        stroke: new Stroke({
            color: 'rgba(0, 0, 0, 255)',
            width: 0.4,
        }),
    }),
    GAS: new Style({
        fill: new Fill({
            color: 'rgba(255, 0, 0, 255)',
        }),
        stroke: new Stroke({
            color: 'rgba(110, 110, 110, 255)',
            width: 0.4,
        }),
    }),
    OIL: new Style({
        fill: new Fill({
            color: 'rgba(56, 168, 0, 255)',
        }),
        stroke: new Stroke({
            color: 'rgba(110, 110, 110, 255)',
            width: 0,
        }),
    }),
    OILGAS: new Style({
        fill: new Fill({
            color: 'rgba(168, 112, 0, 255)',
        }),
        stroke: new Stroke({
            color: 'rgba(110, 110, 110, 255)',
            width: 0.4,
        }),
    }),
};

const vectorSource = new VectorSource({
    loader: (extent, resolution, projection) => {
        const url =
            serviceUrl +
            layer +
            '/query/?f=json&' +
            'returnGeometry=true&spatialRel=esriSpatialRelIntersects&geometry=' +
            encodeURIComponent('{"xmin":' + extent[0] + ',"ymin":' + extent[1] + ',"xmax":' + extent[2] + ',"ymax":' + extent[3] + ',"spatialReference":{"wkid":102100}}') +
            '&geometryType=esriGeometryEnvelope&inSR=102100&outFields=*' +
            '&outSR=102100';
        $.ajax({
            url,
            aType: 'jsonp',
            success: (response: any) => {
                if (response.error) {
                    alert(response.error.message + '\n' + response.error.details.join('\n'));
                } else {
                    // dataProjection will be read from document
                    const features = esrijsonFormat.readFeatures(response, {
                        featureProjection: projection,
                    });
                    if (features.length > 0) {
                        vectorSource.addFeatures(features);
                    }
                }
            },
        });
    },
    strategy: tileStrategy(
        createXYZ({
            tileSize: 512,
        })
    ),
});

const vector = new VectorLayer({
    source: vectorSource,
    style: feature => {
        const classify = feature.get('activeprod');
        return styleCache[classify];
    },
});

const raster = new TileLayer({
    source: new XYZ({
        attributions: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' + 'rest/services/World_Topo_Map/MapServer">ArcGIS</a>',
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/' + 'World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
    }),
});

const map = new Map({
    layers: [raster, vector],
    target: document.getElementById('map') as HTMLElement,
    view: new View({
        center: fromLonLat([-97.6114, 38.8403]),
        zoom: 7,
    }),
});

const displayFeatureInfo = (pixel: number[]) => {
    const features: Feature[] = [];
    map.forEachFeatureAtPixel(pixel, feature => {
        features.push(feature as Feature);
    });
    const infoEl = document.getElementById('info');
    const mapTarget = map.getTargetElement();
    if (features.length > 0) {
        const info: string[] = [];
        for (const f of features) info.push(f.get('field_name'));

        if (infoEl) infoEl.innerHTML = info.join(', ') || '(unknown)';
        mapTarget.style.cursor = 'pointer';
    } else {
        if (infoEl) infoEl.innerHTML = '&nbsp;';
        mapTarget.style.cursor = '';
    }
};

map.on('pointermove', evt => {
    if (evt.dragging) {
        return;
    }
    const pixel = map.getEventPixel(evt.originalEvent);
    displayFeatureInfo(pixel);
});

map.on('click', evt => {
    displayFeatureInfo(evt.pixel);
});
