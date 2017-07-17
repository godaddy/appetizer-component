import assumeEnzyme from 'assume-enzyme';
import { shallow } from 'enzyme';
import assume from 'assume';
import React from 'react';
import Appetizer from './';

assume.use(assumeEnzyme);

describe('Appetizer Component', function () {
  let app;

  describe('#url', function () {
    it('includes the key property in the url', function () {
      app = shallow(<Appetizer public='what' />).instance();

      assume(app.url()).to.equal('https://appetize.io/embed/what');
    });
  });

  describe('#query', function () {
    it('generates a query string', function () {
      app = shallow(<Appetizer public='what' />).instance();

      const query = app.query();

      assume(query).is.a('string');
      assume(query).startWith('?');
    });

    it('url encodes params', function () {
      const params = { hello: 'world' };

      app = shallow(<Appetizer public='what' params={ params } color='white' />).instance();

      const query = app.query();

      assume(query).includes('deviceColor=white');
      assume(query).includes('params=' + encodeURIComponent(JSON.stringify(params)));
    });

    it('renames props to params', function () {
      app = shallow(<Appetizer
        language='en'
        location='23.78934,41.38902'
        version='0.7'
        public='wut'
        color='white'
        link='whatever'
        screen
        adb
        xdoc
      />).instance();

      const query = app.query();

      assume(query).to.include('xdocMsg=true');
      assume(query).to.include('language=en');
      assume(query).to.include('location=' + encodeURIComponent('23.78934,41.38902'));
      assume(query).to.include('osVersion=0.7');
      assume(query).to.include('deviceColor=white');
      assume(query).to.include('screenOnly=true');
      assume(query).to.include('launchUrl=whatever');
      assume(query).to.include('enableAdb=true');
    });
  });

  describe('#render', function () {
    it('returns an iframe', function () {
      app = shallow(<Appetizer public='what' color='white' />);

      assume(app).to.have.tagName('iframe');
    });

    it('passes iframe props to the iframe', function () {
      app = shallow(<Appetizer public='what' color='white' scrolling='no' frameborder='0' />);

      assume(app).to.have.props({ scrolling: 'no', frameborder: '0' });
      assume(app.props().src).to.equal('https://appetize.io/embed/what?device=iphone5s&scale=100&orientation=portrait&autoplay=false&deviceColor=white');
    });
  });
});
