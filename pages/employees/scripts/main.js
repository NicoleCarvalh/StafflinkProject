import { allUtils } from "../../../patternScripts/main.js";
import { employeesTableControl } from "./table/index.js";

allUtils.access()

allUtils.sideMenu()
allUtils.notes()
allUtils.handlePageByCustomLink(document.querySelector('.option.newEmployee'))

employeesTableControl()