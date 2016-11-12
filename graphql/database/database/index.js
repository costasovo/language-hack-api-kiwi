import wrapLogger from '../../utils/wrapLogger';
import getViewer from './getViewer';
import getRoutes from './getRoutes';
import getAirlines from './getAirlines';
import getAirlineName from './getAirlineName';

const database = {
  getViewer,
  getRoutes,
  getAirlines,
  getAirlineName,
};

export default wrapLogger(database);
