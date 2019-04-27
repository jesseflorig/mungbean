// Glossary:
//   field - a key/value pair
//   key - reference for a value
//   value - contents of a key
const fs = require('fs')
const { map } = require('lodash')
const { dev, err, hr, log, plur } = require('./utils')

const defaultCfg = {
  env: 'dev',
  input: null,
  output: './output'
}

// Apply a strategy to an input to create an output
const Mungbean = config => {
  // Merge default config with passed in config
  const cfg = Object.assign(defaultCfg, config)
  const { env, input, output, strategies } = cfg

  dev('Running DEV munge', env)

  // Munge processor
  let results = []
  map(input, item => {
    let mungedItem = flow(strategies)(item)
    results.push(mungedItem)
  })

  // Finish
  hr()
  const inCount = input.length
  log(`Finished processing ${inCount} ${plur('record', inCount)}`)
  dev(results[0], env)
  if (env === 'prod') {
    writeFile(output, results)
  }
}

const flow = fns => item => {
  map(fns, fn => {
    item = fn(item)
  })
  return item
}

const writeFile = (path, data) => {
  log(`Writing file to ${path}`)
  const jsonData = JSON.stringify(data, null, 2)

  fs.writeFile(path, jsonData, err => {
    if (err) {
      err(err)
    }
    log(`Finished writing file to ${path}`)
  })
}

// CSV to JSON
const csvToJson = path => {
  require('require-csv')
  const csv = require(path)
  const keys = csv[0]
  let results = []

  map(csv, (line, idx) => {
    if (idx) {
      let item = {}
      map(keys, (key, kIdx) => {
        item[key] = line[kIdx]
      })
      results.push(item)
    }
  })
  log(`Converted CSV to ${csv.length - 1} JSON items`)
  return results
}

// Add a new field
const addField = (newKey, val) => item => {
  let newItem = item
  if (item[newKey]) {
    err(`Field '${newKey}' already exists - skipping add`)
  } else {
    newItem[newKey] = typeof val === 'function' ? val(item) : val
  }
  return newItem
}

// Remove a field
const delField = key => item => {
  let newItem = item
  if (item[key] !== undefined) {
    delete newItem[key]
  } else {
    err(`Field '${key}' doesn't exist - skipping delete`)
  }
  return newItem
}

// Change a field key
const chgKey = (oldKey, newKey) => item => {
  return flow([addField(newKey, item[oldKey]), delField(oldKey)])(item)
}

// Generate a value from one or more existing fields
const concatVals = ({ fields, delimiter, prefix, postfix }) => item => {
  let fieldVals = map(fields, f => item[f])
  fieldVals = prefix ? [prefix, ...fieldVals] : fieldVals
  fieldVals = postfix ? [...fieldVals, postfix] : fieldVals
  return fieldVals.join(delimiter)
}

// Apply a function to a field if it exists
const modField = fn => field => item => {
  if (item[field]) {
    const newVal = fn(item[field])
    item[field] = newVal
  }
  return item
}

// Uppercase a field value
const upperVal = field => {
  return modField(input => {
    return input.toUpperCase()
  })(field)
}

// Lowercase a field value
const lowerVal = field => {
  return modField(input => {
    return input.toLowerCase()
  })(field)
}

// Capitalize a field value
const capVal = field => {
  return modField(input => {
    return input.toLowerCase().replace(/\b\w/g, l => l.toUpperCase())
  })(field)
}

// Convert value to JSON date
const cvtDate = field => item => {
  const date = new Date(item[field])
  item[field] = date.toJSON()
  return item
}

// Convert value to integer
const intVal = field => item => modField(parseInt)(field)(item)

// Convert value to float
const floatVal = field => item => modField(parseFloat)(field)(item)

// Convert value to dollar
const dollarVal = field => {
  return modField(input => {
    return parseFloat(parseFloat(input).toFixed(2))
  })(field)
}

module.exports = {
  Mungbean,
  addField,
  capVal,
  chgKey,
  concatVals,
  csvToJson,
  cvtDate,
  delField,
  dollarVal,
  floatVal,
  intVal,
  lowerVal,
  modField,
  upperVal
}
