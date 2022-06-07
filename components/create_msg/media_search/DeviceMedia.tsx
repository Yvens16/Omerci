import React, { useState } from 'react'

function DeviceMedia() {
  const [selectedFile, setFiles] = useState<any>("");
  const onFileChange = (e: any) => {
    setFiles(e.target.files[0])
  }
  const onFileUpload = () => {
    const formData = new FormData();
    formData.append("file", selectedFile, selectedFile.name)
    console.log('typeof formData:', typeof formData)
    // for (const [key, value] of formData) {
    //   console.log('»', key, value)
    // }
        /**
     * File {name: 'Années.png', lastModified: 1648474017180, lastModifiedDate: Mon Mar 28 2022 15:26:57 GMT+0200 (heure d’été d’Europe centrale), webkitRelativePath: '', size: 217171, …}
        lastModified: 1648474017180
        lastModifiedDate: Mon Mar 28 2022 15:26:57 GMT+0200 (heure d’été d’Europe centrale) {}
        name: "Années.png"
        size: 217171
        type: "image/png"
        webkitRelativePath: ""
     */
  }
  return (
    <div>
      <h1>DeviceMedia</h1>
      <input type="file" name="" id="" onChange={onFileChange} />
      <button onClick={onFileUpload}>Upload</button>
    </div>
  )
}

export default DeviceMedia;