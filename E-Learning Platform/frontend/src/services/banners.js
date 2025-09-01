import api from "../utils/axios";

export const listBanners = async () => {
  const res = await api.get("/admin/banners");
  return res.data;
};

export const uploadBanners = async (files, captions = []) => {
  const form = new FormData();
  files.forEach((f) => form.append("images", f));
  captions.forEach((c) => form.append("captions", c || ""));
  const res = await api.post("/admin/banners", form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const deleteBanner = async (id) => {
  const res = await api.delete(`/admin/banners/${id}`);
  return res.data;
};

export const getPublicBanners = async () => {
  const res = await api.get("/public/list");
  return res.data;
};
