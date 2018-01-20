import { geoMercator, geoPath, geoCentroid } from 'd3-geo';
import json from './sfmaps/neighborhoods.json';

const SCALE = 256459.98780856523;
const CENTER = [-122.44115773600706, 37.75581744782966];
const OFFSET = [652.4863851020348, 354.5493513467512];

const memo = {};

const getProjectionData = (width, height) => {
  // https://stackoverflow.com/questions/14492284/center-a-map-in-d3-given-a-geojson-object
  // create a first guess for the projection
  const key = [width, height].join(',');
  if (memo.hasOwnProperty(key)) {
    return memo[key];
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


  memo[key] = { scale, center, offset };
  return { scale, center, offset };
};

export const getProjection = (width, height) => {
  const {
    scale = SCALE,
    center = CENTER,
    offset = OFFSET 
  } = getProjectionData(width, height)

  return geoMercator()
    .scale(scale)
    .center(center)
    .translate(offset)
}

const pathGenerator = (data, width, height) => {
  const projection = getProjection(width, height);
  return geoPath().projection(projection)(data);
}

export default pathGenerator;