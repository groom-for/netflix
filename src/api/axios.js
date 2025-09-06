import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "9ae36d75925b599128a51c3470bd57b3",
    language: "ko-KR",
  },
});

export default instance;
