import Map from 'ol/Map';
import View from 'ol/View';
import WKT from 'ol/format/WKT';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source';

declare var jsPDF: any;

const raster = new TileLayer({
    source: new OSM(),
});

const format = new WKT();
const feature = format.readFeature(
    'POLYGON((10.689697265625 -25.0927734375, 34.595947265625 ' +
        '-20.1708984375, 38.814697265625 -35.6396484375, 13.502197265625 ' +
        '-39.1552734375, 10.689697265625 -25.0927734375))',
);
feature.getGeometry().transform('EPSG:4326', 'EPSG:3857');

const vector = new VectorLayer({
    source: new VectorSource({
        features: [feature],
    }),
});

const map = new Map({
    layers: [raster, vector],
    target: 'map',
    view: new View({
        center: [0, 0],
        zoom: 2,
    }),
});

const dims: { [key: string]: number[] } = {
    a0: [1189, 841],
    a1: [841, 594],
    a2: [594, 420],
    a3: [420, 297],
    a4: [297, 210],
    a5: [210, 148],
};

const exportButton = document.getElementById('export-pdf') as HTMLButtonElement;

exportButton.addEventListener(
    'click',
    () => {
        exportButton.disabled = true;
        document.body.style.cursor = 'progress';

        const format_ = (document.getElementById('format') as HTMLInputElement).value;
        const resolution = (document.getElementById('resolution') as HTMLInputElement).value;
        const dim = dims[format_];
        const width = Math.round((dim[0] * Number(resolution)) / 25.4);
        const height = Math.round((dim[1] * Number(resolution)) / 25.4);
        const size = map.getSize();
        const extent = map.getView().calculateExtent(size);

        map.once('rendercomplete', event => {
            const canvas = event.context.canvas;
            const data = canvas.toDataURL('image/jpeg');
            const pdf = new jsPDF('landscape', undefined, format);
            pdf.addImage(data, 'JPEG', 0, 0, dim[0], dim[1]);
            pdf.save('map.pdf');
            // Reset original map size
            map.setSize(size);
            map.getView().fit(extent, { size });
            exportButton.disabled = false;
            document.body.style.cursor = 'auto';
        });

        // Set print size
        const printSize = [width, height];
        map.setSize(printSize);
        map.getView().fit(extent, { size: printSize });
    },
    false,
);
