/* eslint-env mocha */

/**
 * ESLint test spec
 *
 * @author Emre Piskin <piskin.emre@gmail.com>
 */

import standard from 'mocha-standard'

describe('ESLint: Source and test codes', () => {
  it('conforms to JavaScript Standard Styles (Standard JS)',
    standard.files([
      'src/js/**/*.js',
      'test/**/*.js'
    ]))
})
