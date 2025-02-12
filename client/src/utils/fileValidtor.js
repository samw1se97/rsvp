function fileValidtor(files) {
  const validExtensions = /\.(jpg|jpeg|png|gif)$/i;

  const filteredFiles = files.filter((file) => validExtensions.test(file.name));
  return filteredFiles;
}
export default fileValidtor;
