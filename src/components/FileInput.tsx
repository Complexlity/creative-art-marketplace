const FileInput = props => {
  const [fileName, setFileName] = useState("");

  const  = e => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    if (file) {
      reader.onloadend = () => setFileName(file.name);
      reader.readAsDataURL(file);
      props.setFieldValue(props.field.name, file);
    }
  };

  return (
     <div className="upload-file grid gap-4">
          <label>Upload file</label>
          <div className={`grid content-center items-center gap-4 rounded-xl border-4 border-dotted px-4 py-8 ${!touched.nft ? "border-gray-400" : errors.nft && touched.nft ? "border-red-400" : "border-green-400"}`}>
            <p className="pt-2 text-center">
              PNG, JPG, WEBP or PNG
            </p>
            <div className="text-center">
              <label
                htmlFor="nft"
                className="inline rounded-full bg-primary px-6 py-1 text-gray-800"
              >
                Browse
              </label>
              <input
                type="file"
                id="nft"
                name="nft"
                accept="image/png, image/jpeg, image/png"
                className="hidden-input"

                onChange={handleChange}

              />

            </div>


          </div>
        </div>

  );
};

export default VideoInput;
