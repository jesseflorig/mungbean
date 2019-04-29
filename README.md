# Mungbean (netrunner)
A simple JSON munger for [netrunner-json](https://github.com/jesseflorig/netrunner-json)

## Configuration
 - `input`: the data to munge
 - `output`: path to write output
 - `strategy`: the processing steps to take

## Strategies
Mungbean makes a couple common munging processes available:

### addField
Add a field

### capVal
Capitalize a field value by key

### chgKey
Change an existing key to a new key

### concatVals
Concatenate field values

### csvToJson
Convert a CSV to JSON

### cvtDate
Convert a date to a JSON date

### delField
Delete a field by key

### dollarVal
Convert a field value to a number to two decimal places

### floatVal
Convert a field value to a float

### genVal
Pass in a function to generate a value

### intVal
Convert a field value to an integer

### lowerVal
Lowercase a value by key

### modField
Utility function for modifying a field if it exists

### upperVal
Uppercase a value by key
