import configs from "./configs"
import * as users from "./users"
import * as groups from "./groups"
import * as accounts from "./accounts"

const TENANT_ID = "default"
const TENANT_1 = "tenant1"
const CSRF_TOKEN = "e3727778-7af0-4226-b5eb-f43cbe60a306"

const pkg = {
  configs,
  users,
  accounts,
  TENANT_ID,
  TENANT_1,
  CSRF_TOKEN,
  groups,
}

export = pkg
