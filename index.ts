// ==========================
// uncomment for testing
// ==========================
// import { uploadFile, downloadFile } from "./src/routes";

// const createSampleFile = () => {
//   const content = "This is a sample text file content.";
//   const blob = new Blob([content], { type: "text/plain" });
//   const file = new File([blob], "sample.txt", { type: "text/plain" });
//   return file;
// };

// uploadFile(createSampleFile(), "", "");
// downloadFile("37007e8d-ef6e-4125-82bb-8371425245f7");

export * from "./src/routes";
