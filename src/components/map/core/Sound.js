/* global System, Q */

'use strict';

/*---------------------
------- IMPORT --------
----------------------*/
import * as log from 'components/logger/log';
import * as Howl from 'howler';
import * as Q from 'q';

/*---------------------
--------- API ---------
----------------------*/
export class Sound {
  constructor() {
    this.allSounds = {};
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
  add(name, url, options = { loop: false, volume: 1, urls: []}) {
    const ERROR_STRING = "The sound '" + name + "' was unable to load!";
    var { loop, volume } = options;

    allSounds[name] = {};
    allSounds[name] = new Howl({
      urls: [url],
      loop,
      volume,
      onend: () => {
        allSounds[name].onend();
      }
    });
    allSounds[name].onloaderror = (e) => {
      log.debug(ERROR_STRING);
    }

    return allSounds[name];
  }
  /**
   * Remove the sound from usage and memory
   *
   * @method remove
   * @param {String} name     Name / identifier of the sound to be removed
   */
  remove(name) {
    delete allSounds[name];
  }
  /**
   * Start the sounds playback
   *
   * @method play
   * @param  {String} name      Name of the sound to play
   * @return {Object}           Object that contains promises of the sounds state. end, pause and onload.
   */
  play(name) {
    var promise = Q.defer();

    allSounds[name].onend = () => {
      promise.resolve(true);;
    }
    allSounds[name].play();

    return {
      end: promise.promise,
      pause: promise.promise,
      onload: promise.promise
    };
  }
  /**
   * stop sound playback
   *
   * @method stop
   * @param  {String} name      Name of the sound to stop playing
   */
  stop(name) {
    allSounds[name].stop();
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

    allSounds[name].fade(from, to, duration, cb);

    return promise.promise;
  }
}