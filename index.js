/*
 *  Save your changes to rerun the munger
 *
 */

const { map } = require("lodash");
const { Mungbean, chgKey, delField } = require("./mungbean");
const { printKeys } = require("./util");
const { getMembers, getVendors } = require("./bkbgUtil");

const members = getMembers();
const vendors = getVendors();

const memberCfg = {
  env: "prod",
  input: members,
  output: "/Users/jesse/Dropbox/Documents/BKBG/Rotations/2019/members.json",
  strategies: [
    chgKey("Company ID", "id"),
    chgKey("Company", "name"),
    chgKey("State", "state"),
    delField("Booth#"),
    delField("Member Type")
  ]
};

const vendorCfg = {
  env: "prod",
  input: vendors,
  output: "/Users/jesse/Dropbox/Documents/BKBG/Rotations/2019/vendors.json",
  strategies: [
    chgKey("Company ID", "id"),
    chgKey("Company", "name"),
    chgKey("Booth#", "booth"),
    delField("Member Type"),
    delField("Zip")
  ]
};

Mungbean(memberCfg);
Mungbean(vendorCfg);
