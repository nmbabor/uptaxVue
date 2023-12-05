import Api from "@/services/Api";

export default {
  index(form) {
    return Api().get("license-tax-collection", { params: form });
  },
  store(params) {
    return Api().post("license-tax-collection", params);
  },
  licenses(form) {
    return Api().get("license-tax-collection/create", { params: form });
  },
  singleLicense(id, form) {
    return Api().get("trade-license/single/" + id, { params: form });
  },
  years() {
    return Api().get("years");
  }
};
