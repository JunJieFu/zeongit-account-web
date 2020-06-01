export default {
  domain:
    process.env.NODE_ENV === "development" ? "localhost:12085" : ".secdra.com",
  host: process.env.NODE_ENV === "development" ? "/api" : "/",
  accountHost:
    process.env.NODE_ENV === "development"
      ? "http://localhost:12180/#"
      : "http://account.secdra.com/#",
  qiniuImg: "http://secdraimg.secdra.com",
  qiniuHead: "http://secdrahead.secdra.com",
  qiniuBack: "http://secdraback.secdra.com",
  qiniuSeparator: "-"
}
