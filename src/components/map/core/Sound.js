/* global System, Q */

'use strict';

/*---------------------
------- IMPORT --------
----------------------*/
import * as log from 'components/logger/log';
import Howler from 'howler';
import * as Q from 'q';

/*---------------------
--------- API ---------
----------------------*/
export class Sound {
  constructor() {
    this._allSounds = {};
  }
  /**
   * Add a sound to be used.
   *
   * @method add
   * @param {String} name               Name / identifier
   * @param {String} urls               An array of urls or one url
   * @param {Object} options            *OPTIONAL*
   * @param {Booleam} options.loop      Wether the sound will be looped or not
   * @param {Object} options.volume     The volume of the sound (0 - 1)
   * @return {Object}                   Created instance of sound
   */
  add(name, url, options = { loop: false, volume: 1 }) {
    const ERROR_STRING = "The sound '" + name + "' was unable to load!";
    var { loop, volume } = options;

    this._allSounds[name] = {};
    this._allSounds[name] = new Howler.Howl({
      urls: [url]/*,
      autoplay: true,
      loop: true,
      volume: 1,
      onloaderror = (e) => {
        log.debug(ERROR_STRING);
      }*/
    });

    return this._allSounds[name];
  }
  /**
   * Remove the sound from usage and memory
   *
   * @method remove
   * @param {String} name     Name / identifier of the sound to be removed
   */
  remove(name) {
    delete this._allSounds[name];
  }
  /**
   * Start the sounds playback
   *
   * @method play
   * @param  {String} name      Name of the sound to play
   * @return {Object}           Object that contains promises of the sounds state. end, pause and onload.
   */
  play(name) {
    debugger;
    var promise = Q.defer();

    this._allSounds[name]._onend = () => {
      promise.resolve(true);;
    }
    this._allSounds[name].play();

    return {
      end: promise.promise,
      pause: promise.promise
    };
  }
  /**
   * stop sound playback
   *
   * @method stop
   * @param  {String} name      Name of the sound to stop playing
   */
  stop(name) {
    this._allSounds[name].stop();
  }
  /**
   * Fade the sound in or out
   *
   * @method  fade
   * @param  {String} name            Name / identifier of the sound
   * @param  {Object} from            Volume to fade from
   * @param  {Object} to              Volume to fade to
   * @param  {Object} duration        Time in milliseconds to fade
   * @return {Promise}                Promise that resolves after fade is complete
   */
  fade(name, from, to, duration) {
    var promise = Q.defer();
    var cb;
    cb = () => {
      promise.resolve(true);
    };

    this._allSounds[name].fade(from, to, duration, cb);

    return promise.promise;
  }
}