const assert = require( 'chai' ).assert;
import GlobalData from '../models/GlobalData';

globalData = new GlobalData();

describe('GlobalData', function() {

  describe('ajaxUrl', function() {

    it('should be string', function() {
    	assert.isString( globalData.get( 'ajaxUrl' ), 'its not string' );
    });

  });

});