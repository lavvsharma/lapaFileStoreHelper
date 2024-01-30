import config from "./utils/config";

const uploadFile = async (
  file: any,
  filePurpose?: string,
  systemRelativePath?: string
): Promise<any> => {
  try {
    /* 
    Create a FormData object to handle the file upload
    file_purpose is optional
    system_relative_path has a default value
    */
    const formData = new FormData();

    formData.append("file", file);

    // If filePurpose is null/undefined/empty do not add in the final formData
    if (
      filePurpose !== undefined &&
      filePurpose !== null &&
      filePurpose !== ""
    ) {
      formData.append("file_purpose", filePurpose);
    }

    // If systemRelativePath is null/undefined/empty do not add in the final formData
    if (
      systemRelativePath !== undefined &&
      systemRelativePath !== null &&
      systemRelativePath !== ""
    ) {
      formData.append("system_relative_path", systemRelativePath);
    }

    // Initiate the fetch request
    const response = await fetch(`${config.lapaFileStoreUrl}/upload_file`, {
      method: "POST",
      body: formData,
    });
    console.log(response);

    if (response.status === 200) {
      const result = await response.json();
      console.log(
        `File uploaded successfully. FileStorageToken - ${result.additional_info.FileStorageToken}`
      );
      return result;
    } else {
      console.error("Failed to upload file:", response.statusText);
      return null;
    }
  } catch (exc) {
    console.error(exc);
    throw new Error(`Error in uploadFile, exception - ${exc}`);
  }
};

const downloadFile = async (
  lapaFileStoreUrl: string,
  fileStorageToken: string
): Promise<{ blob: Blob; filename: string }> => {
  try {
    console.log(
      `Input: lapaFileStoreUrl - ${config.lapaFileStoreUrl}, fileStorageToken - ${fileStorageToken}`
    );

    // Initialize the download_file URL for lapa-file-store
    const lapaFileStoreDownloadUrl = `${lapaFileStoreUrl}/download_file?file_storage_token=${fileStorageToken}`;
    const response = await fetch(lapaFileStoreDownloadUrl);

    if (response.status == 200) {
      console.log(
        `File downloaded successfully for file_storage_token - ${fileStorageToken}`
      );

      // Access the Content-Disposition header
      const contentDispositionHeader = response.headers.get(
        "Content-Disposition"
      );

      // Extract the filename from the header
      const match =
        contentDispositionHeader &&
        contentDispositionHeader.match(/filename="(.+?)"/);
      const filename = match ? match[1] : "downloaded_file";
      const blob = await response.blob();

      console.log(`Output: filename - ${filename}, blob - ${blob}`);
      return { blob, filename };
    } else {
      throw new Error(
        `Invalid status from /download_file endpoint. Input: lapaFileStoreDownloadUrl - ${lapaFileStoreDownloadUrl}. Output: ${response.status}`
      );
    }
  } catch (exc) {
    console.error(exc);
    throw new Error(`Error in downloadFile, exception - ${exc}`);
  }
};

export { uploadFile, downloadFile };
