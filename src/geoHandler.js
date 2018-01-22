import { geoMercator, geoPath, geoCentroid } from 'd3-geo';
import json from './geojson/neighborhoods.json';

const projectionMemo = {};

const getProjectionData = (width, height) => {
  // https://stackoverflow.com/questions/14492284/center-a-map-in-d3-given-a-geojson-object
  // create a first guess for the projection
  const key = [width, height].join(',');
  if (projectionMemo.hasOwnProperty(key)) {
    return projectionMemo[key];
  }

  const center = geoCentroid(json)
  let scale  = 150;
  let offset = [width/2, height/2];
  const projection = geoMercator().scale(scale).center(center)
      .translate(offset);

  // create the path
  const path = geoPath().projection(projection);

  // using the path determine the bounds of the current map and use 
  // these to determine better values for the scale and translation
  const bounds  = path.bounds(json);
  const hscale  = scale*width  / (bounds[1][0] - bounds[0][0]);
  const vscale  = scale*height / (bounds[1][1] - bounds[0][1]);
  scale   = (hscale < vscale) ? hscale : vscale;
  offset  = [width - (bounds[0][0] + bounds[1][0])/2,
                height - (bounds[0][1] + bounds[1][1])/2];


  projectionMemo[key] = { scale, center, offset };
  return { scale, center, offset };
};

export const getProjection = (width, height) => {
  const { scale, center, offset } = getProjectionData(width, height)

  return geoMercator()
    .scale(scale)
    .center(center)
    .translate(offset);
};

export const generatePath = (data, width, height) => {
  const projection = getProjection(width, height);
  return geoPath().projection(projection)(data);
};