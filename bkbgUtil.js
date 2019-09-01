const fs = require("fs");
const path = require("path");
const { filter, map, pick, uniqBy } = require("lodash");
const { csvToJson } = require("./mungbean");

//Constants
const ATTRS = ["Company ID", "Company", "Booth#", "Member Type", "State"]
const COMPANY_PATH = "/Users/jesse/Dropbox/Documents/BKBG/Rotations/2019/companies.csv";

// Get all companies
function getCompaniesJson() {
  const json = csvToJson(COMPANY_PATH)
  return map(json, item => pick(item, ATTRS))
}


function getCompaniesByType(type){
  const companies = getCompaniesJson()
  return filter(companies, {"Member Type": type})
}

function getMembers(){
  return uniqBy(getCompaniesByType("Member"), ATTRS[0])
}

function getVendors(){
  return uniqBy(getCompaniesByType("Vendor"), ATTRS[0])
}

module.exports = { getMembers, getVendors };
