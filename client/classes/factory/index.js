import Factory from './factory.class';

// Import units to be created by factory
import ChartOption from '../chartOption';
import Cache from '../cache';
import Table from '../table';

var factory = new Factory();

// Register all units that can be created by factory
factory.register('chartOption', ChartOption);
factory.register('cache', Cache);
factory.register('table', Table);

export default factory;
