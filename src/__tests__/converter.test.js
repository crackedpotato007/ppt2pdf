/* eslint-disable sonarjs/no-duplicate-string */

const test = require('node:test');
const assert = require('node:assert');
const { fileExists } = require('@hckrnews/converter');
const Converter = require('../converter.js');


test('PPT2PDF converter test', async (t) => {
  await t.test('It should generate the converter', () => {
    const converter = Converter.create({
      file: 'test/example.ppt',
      output: 'output/'
    })

    assert.strictEqual(converter.oldFile.path, 'test/example.ppt')
  })

  await t.test('It should generate the converter', async () => {
    const converter = Converter.create({
      file: 'test/example.ppt',
      output: 'output/'
    })

    const result = converter.convert()

    assert.strictEqual(result.file.path, 'test/example.ppt')
    assert.strictEqual(converter.pdf, 'output/example.pdf')
    assert.strictEqual(fileExists('output/example.pdf'), true)
  })

  await t.test('It should generate the converter', async () => {
    const converter = Converter.create({
      file: 'test/example.ppt',
      output: 'output/',
      customConverter: 'libreoffice --headless --convert-to pdf --outdir'
    })

    const result = converter.convert()

    assert.strictEqual(result.file.path, 'test/example.ppt')
    assert.strictEqual(converter.pdf, 'output/example.pdf')
    assert.strictEqual(fileExists('output/example.pdf'), true)
  })

  await t.test('It should return the default converter', () => {
    const converter = Converter.create({
      file: 'test/example.ppt',
      output: 'output/',
      customConverter: 'libreoffice --headless --convert-to pdf --outdir'
    })

    const result = converter.converter

    assert.strictEqual(result, converter.converterForLinux)
  })

  await t.test('It should return the custom converter', () => {
    const converter = Converter.create({
      file: 'test/example.ppt',
      output: 'output/',
      customConverter: 'example'
    })

    const result = converter.converter

    assert.strictEqual(result, 'example')
  })

  await t.test('It should throw an error if the file isnt a string', () => {
    try {
      Converter.create({
        file: 42
      })
    } catch (error) {
      assert.strictEqual(error.message, 'File should be a string')
    }
  })

  await t.test('It should throw an error if the output isnt a string', () => {
    try {
      Converter.create({
        file: 'test/example.ppt',
        output: 42
      })
    } catch (error) {
      assert.strictEqual(error.message, 'Output should be a string')
    }
  })

  await t.test(
    'It should throw an error if the output folder doesnt exists',
    () => {
      try {
        Converter.create({
          file: 'test/example.ppt',
          output: 'unknownfolder/'
        })
      } catch (error) {
        assert.strictEqual(
          error.message,
          'Output folder doesnt exists'
        )
      }
    }
  )

  await t.test(
    'It should throw an error if the output folder doesnt exists',
    () => {
      try {
        Converter.create({
          file: 'test/example.ppt',
          output: 'test/example.ppt'
        })
      } catch (error) {
        assert.strictEqual(
          error.message,
          'Output folder doesnt exists'
        )
      }
    }
  )

  await t.test(
    'It should throw an error if the converter isnt a string',
    () => {
      try {
        Converter.create({
          file: 'test/example.ppt',
          output: 'output/',
          customConverter: 42
        })
      } catch (error) {
        assert.strictEqual(
          error.message,
          'Converter should be a string'
        )
      }
    }
  )
})
