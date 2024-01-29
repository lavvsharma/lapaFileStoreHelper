// ==========================
// uncomment for testing
// ==========================
// import { uploadFile, downloadFile } from "./routes";

// const createSampleFile = () => {
//   const content = "This is a sample text file content.";
//   const blob = new Blob([content], { type: "text/plain" });
//   const file = new File([blob], "sample.txt", { type: "text/plain" });
//   return file;
// };

// uploadFile("http://localhost:10100", createSampleFile(), "", "");
// downloadFile("http://localhost:10100", "37007e8d-ef6e-4125-82bb-8371425245f7");

export * from "./routes";
