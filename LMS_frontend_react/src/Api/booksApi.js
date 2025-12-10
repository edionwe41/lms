import axiosClient from "./axiosClient";

export const getBooks = async () => {
  const response = await axiosClient.get("/books");
  return response.data;
};

export const createBook = async (payload) => {
  const response = await axiosClient.post("/books", payload);
  return response.data;
};
