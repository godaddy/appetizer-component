import { stringify } from 'querystringify';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import rip from 'rip-out';

/**
 * The propTypes are stored in a const as we need to know which keys are used in
 * the API so we can remove them from the component props and spread the rest of
 * the props as iframe properties.
 *
 * @type {Object}
 * @private
 */
const propTypes = {
  public: PropTypes.string.isRequired,
  endpoint: PropTypes.string,
  device: PropTypes.oneOf([
    'iphone4s', 'iphone5s', 'iphone6', 'iphone6plus', 'ipadair', 'iphone6s',
    'iphone6splus', 'ipadair2', 'nexus5', 'nexus7', 'nexus9'
  ]),
  version: PropTypes.string,
  scale: PropTypes.number,
  orientation: PropTypes.oneOf(['portrait', 'landscape']),
  color: PropTypes.oneOf(['white', 'black']),
  screen: PropTypes.bool,
  xdoc: PropTypes.bool,
  language: PropTypes.string,
  locale: PropTypes.string,
  location: PropTypes.string,
  link: PropTypes.string,
  proxy: PropTypes.string,
  adb: PropTypes.bool,
  apk: PropTypes.bool,
  autoplay: PropTypes.bool,
  params: PropTypes.object
};

/**
 * Embed Appetize.io devices on your page.
 *
 * @constructor
 * @public
 */
export default class Appetizer extends Component {
  /**
   * Generate the URL on which the application is hosted.
   *
   * @returns {String} The API endpoint.
   * @private
   */
  url() {
    return this.props.endpoint + this.props.public;
  }

  /**
   * Generate the query string with the correct options.
   *
   * @param {Object} props Properties we need to use.
   * @returns {String} The query string for the url.
   * @private
   */
  query(props = this.props) {
    const data = {};

    data.device = props.device;
    data.scale = props.scale;
    data.orientation = props.orientation;
    data.autoplay = props.autoplay ? 'true' : 'false';
    data.deviceColor = props.color;

    if (props.language) data.language = props.language;
    if (props.location) data.location = props.location;
    if (props.version) data.osVersion = props.version;
    if (props.locale) data.locale = props.locale;
    if (props.screen) data.screenOnly = 'true';
    if (props.xdoc) data.xdocMsg = 'true';
    if (props.adb) data.enableAdb = 'true';
    if (props.apk) data.androidPackageManager = 'true';
    if (props.link) data.launchUrl = props.link;

    if (typeof props.params === 'object') {
      data.params = JSON.stringify(props.params);
    }

    return stringify(data, true);
  }

  /**
   * Renders the <iframe> element that embeds the device.
   *
   * @returns {Component} React Component to render.
   * @public
   */
  render() {
    const props = this.props;
    const url = this.url() + this.query(props);
    const iframe = rip(props, ...Object.keys(propTypes));

    return (
      <iframe { ...iframe } src={ url }></iframe>
    );
  }
}

/**
 * Default properties.
 *
 * @type {Object}
 * @private
 */
Appetizer.defaultProps = {
  endpoint: 'https://appetize.io/embed/',
  device: 'iphone5s',
  scale: 100,
  orientation: 'portrait',
  autoplay: false,
  color: 'black',
  screen: false,
  xdoc: false
};

/**
 * PropTypes validation for development purposes.
 *
 * @type {Object}
 * @private
 */
Appetizer.propTypes = propTypes;
