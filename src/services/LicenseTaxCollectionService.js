import Api from "@/services/Api";

export default {
  index(form) {
    return Api().get("license-tax-collection", { params: form });
  },
  show(id, form) {
    return Api().get("license-tax-collection/" + id, { params: form });
  },
  delete(id, year) {
    return Api().delete("license-tax-collection/" + id, { params: { year } });
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
