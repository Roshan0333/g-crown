import {Router} from "express";
import {getShowrooms,
    suggestions,
    filteredSearch,
    searchByCityPincode,
    searchByPincode,
    searchByState,
    searchByCity,
    searchKeyword} from "../../controllers/customer/store.controllers.js";

const router = Router();

router.route("/").get(getShowrooms);
router.route("/keyword").get(searchKeyword);
router.route("/city").get(searchByCity);
router.route("/state").get(searchByState);
router.route("pincode").get(searchByPincode);
router.route("city-pincode").get(searchByCityPincode);
router.route("filter").get(filteredSearch);
router.route("/suggest").get(suggestions);

export default router;


