import { geoMercator, geoPath } from 'd3-geo';

const getProjection = (scale, center, translate) => {
  return geoMercator()
    .scale(scale)
    .center(center)
    .translate(translate)
}

const pathGenerator = (width, height) => {
  const scale = 350000;
  const center = [-122.433701, 37.767683];
  const translate = [width / 2, height / 2];
  const projection = getProjection(scale, center, translate);

  return (d) => {
    return geoPath().projection(projection)(d);
  }
}

export default pathGenerator;