import { allUtils } from "../../../patternScripts/main.js";
import { employeesTableControl } from "./table/index.js";

allUtils.sideMenu()
allUtils.notes()
allUtils.access({user: {access: true}})

employeesTableControl()