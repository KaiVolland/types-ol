import { FeatureLike } from 'ol/Feature';
import Map from 'ol/Map';
import View from 'ol/View';
import GeoJSON from 'ol/format/GeoJSON';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Circle as CircleStyle, Fill, Stroke, Style, Text } from 'ol/style';

let openSansAdded = false;

const myDom = {
    points: {
        text: document.getElementById('points-text'),
        align: document.getElementById('points-align'),
        baseline: document.getElementById('points-baseline'),
        rotation: document.getElementById('points-rotation'),
        font: document.getElementById('points-font'),
        weight: document.getElementById('points-weight'),
        size: document.getElementById('points-size'),
        offsetX: document.getElementById('points-offset-x'),
        offsetY: document.getElementById('points-offset-y'),
        color: document.getElementById('points-color'),
        outline: document.getElementById('points-outline'),
        outlineWidth: document.getElementById('points-outline-width'),
        maxreso: document.getElementById('points-maxreso'),
    },
    lines: {
        text: document.getElementById('lines-text'),
        align: document.getElementById('lines-align'),
        baseline: document.getElementById('lines-baseline'),
        rotation: document.getElementById('lines-rotation'),
        font: document.getElementById('lines-font'),
        weight: document.getElementById('lines-weight'),
        placement: document.getElementById('lines-placement'),
        maxangle: document.getElementById('lines-maxangle'),
        overflow: document.getElementById('lines-overflow'),
        size: document.getElementById('lines-size'),
        offsetX: document.getElementById('lines-offset-x'),
        offsetY: document.getElementById('lines-offset-y'),
        color: document.getElementById('lines-color'),
        outline: document.getElementById('lines-outline'),
        outlineWidth: document.getElementById('lines-outline-width'),
        maxreso: document.getElementById('lines-maxreso'),
    },
    polygons: {
        text: document.getElementById('polygons-text'),
        align: document.getElementById('polygons-align'),
        baseline: document.getElementById('polygons-baseline'),
        rotation: document.getElementById('polygons-rotation'),
        font: document.getElementById('polygons-font'),
        weight: document.getElementById('polygons-weight'),
        placement: document.getElementById('polygons-placement'),
        maxangle: document.getElementById('polygons-maxangle'),
        overflow: document.getElementById('polygons-overflow'),
        size: document.getElementById('polygons-size'),
        offsetX: document.getElementById('polygons-offset-x'),
        offsetY: document.getElementById('polygons-offset-y'),
        color: document.getElementById('polygons-color'),
        outline: document.getElementById('polygons-outline'),
        outlineWidth: document.getElementById('polygons-outline-width'),
        maxreso: document.getElementById('polygons-maxreso'),
    },
};

const getText = (feature: FeatureLike, resolution: number, dom: any) => {
    const type = dom.text.value;
    const maxResolution = dom.maxreso.value;
    let text = feature.get('name');

    if (resolution > maxResolution) {
        text = '';
    } else if (type === 'hide') {
        text = '';
    } else if (type === 'shorten') {
        text = text.trunc(12);
    } else if (type === 'wrap' && (!dom.placement || dom.placement.value !== 'line')) {
        text = stringDivider(text, 16, '\n');
    }

    return text;
};

const createTextStyle = (feature: FeatureLike, resolution: number, dom: any) => {
    const align = dom.align.value;
    const baseline = dom.baseline.value;
    const size = dom.size.value;
    const offsetX = parseInt(dom.offsetX.value, 10);
    const offsetY = parseInt(dom.offsetY.value, 10);
    const weight = dom.weight.value;
    const placement = dom.placement ? dom.placement.value : undefined;
    const maxAngle = dom.maxangle ? parseFloat(dom.maxangle.value) : undefined;
    const overflow = dom.overflow ? dom.overflow.valu === 'true' : undefined;
    const rotation = parseFloat(dom.rotation.value);
    if (dom.font.valu === "'Open Sans'" && !openSansAdded) {
        const openSans = document.createElement('link');
        openSans.href = 'https://fonts.googleapis.com/css?family=Open+Sans';
        openSans.rel = 'stylesheet';
        document.getElementsByTagName('head')[0].appendChild(openSans);
        openSansAdded = true;
    }
    const font = weight + ' ' + size + ' ' + dom.font.value;
    const fillColor = dom.color.value;
    const outlineColor = dom.outline.value;
    const outlineWidth = parseInt(dom.outlineWidth.value, 10);

    return new Text({
        textAlign: align === '' ? undefined : align,
        textBaseline: baseline,
        font,
        text: getText(feature, resolution, dom),
        fill: new Fill({ color: fillColor }),
        stroke: new Stroke({ color: outlineColor, width: outlineWidth }),
        offsetX,
        offsetY,
        placement,
        maxAngle,
        overflow,
        rotation,
    });
};

// Polygons
function polygonStyleFunction(feature: FeatureLike, resolution: number) {
    return new Style({
        stroke: new Stroke({
            color: 'blue',
            width: 1,
        }),
        fill: new Fill({
            color: 'rgba(0, 0, 255, 0.1)',
        }),
        text: createTextStyle(feature, resolution, myDom.polygons),
    });
}

const vectorPolygons = new VectorLayer({
    source: new VectorSource({
        url: 'data/geojson/polygon-samples.geojson',
        format: new GeoJSON(),
    }),
    style: polygonStyleFunction,
});

// Lines
function lineStyleFunction(feature: FeatureLike, resolution: number) {
    return new Style({
        stroke: new Stroke({
            color: 'green',
            width: 2,
        }),
        text: createTextStyle(feature, resolution, myDom.lines),
    });
}

const vectorLines = new VectorLayer({
    source: new VectorSource({
        url: 'data/geojson/line-samples.geojson',
        format: new GeoJSON(),
    }),
    style: lineStyleFunction,
});

// Points
function pointStyleFunction(feature: FeatureLike, resolution: number) {
    return new Style({
        image: new CircleStyle({
            radius: 10,
            fill: new Fill({ color: 'rgba(255, 0, 0, 0.1)' }),
            stroke: new Stroke({ color: 'red', width: 1 }),
        }),
        text: createTextStyle(feature, resolution, myDom.points),
    });
}

const vectorPoints = new VectorLayer({
    source: new VectorSource({
        url: 'data/geojson/point-samples.geojson',
        format: new GeoJSON(),
    }),
    style: pointStyleFunction,
});

const map = new Map({
    layers: [
        new TileLayer({
            source: new OSM(),
        }),
        vectorPolygons,
        vectorLines,
        vectorPoints,
    ],
    target: 'map',
    view: new View({
        center: [-8161939, 6095025],
        zoom: 8,
    }),
});

const refreshPointsEl = document.getElementById('refresh-points');
refreshPointsEl &&
    refreshPointsEl.addEventListener('click', () => {
        vectorPoints.setStyle(pointStyleFunction);
    });

const refreshLinesEl = document.getElementById('refresh-lines');
refreshLinesEl &&
    refreshLinesEl.addEventListener('click', () => {
        vectorLines.setStyle(lineStyleFunction);
    });

const refreshPolygonsEl = document.getElementById('refresh-polygons');
refreshPolygonsEl &&
    refreshPolygonsEl.addEventListener('click', () => {
        vectorPolygons.setStyle(polygonStyleFunction);
    });

// http://stackoverflow.com/questions/14484787/wrap-text-in-javascript
function stringDivider(str: string, width: number, spaceReplacer: string): string {
    if (str.length > width) {
        let p = width;
        while (p > 0 && (str[p] !== ' ' && str[p] !== '-')) {
            p--;
        }
        if (p > 0) {
            let left: string;
            left = str.substring(p, p + 1) === '-' ? str.substring(0, p + 1) : str.substring(0, p);
            const right = str.substring(p + 1);
            return left + spaceReplacer + stringDivider(right, width, spaceReplacer);
        }
    }
    return str;
}
