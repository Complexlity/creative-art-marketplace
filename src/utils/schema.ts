import * as yup from 'yup'
const FILE_SIZE = 100 * 1024;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/webp", "image/png", "image/svg"];

export const schema = yup.object().shape({
  title: yup.string().required("Provide a title to your NFT"),
  isPrice: yup.boolean(),
  isMinBid: yup.boolean(),
  price: yup.number().when("isPrice", {
    is: true,
    then: () =>
      yup.number().moreThan(0, "Number must be greater than zero").nullable().required("Min bid cannot be empty"),
  }),
  minBid: yup.number().when("isMinBid", {
    is: true,
    then: () =>
      yup
        .number()
        .moreThan(0, "Number must be greater than zero")
        .nullable()
        .required("Min bid cannot be empty"),
  }),
  description: yup.string().required("Provide a description of you NFT"),
  royalties: yup
    .number()
    .required("Missing Or Invalid (must be integer greater between 0 and 70")
  .moreThan(0, "Number must be greater than zero")
    .nullable()
    .max(70, "Item cannot exceed 70%"),

  collections: yup.string().required("Choose a category"),
});


export const bidSchema = yup.object().shape({
  bid: yup.number()
  .required("Missing Or Invalid")
  .moreThan(0, "Number must be greater than zero")
    .nullable(),
  understandTerms: yup.array().min(1, "Accept my terms 🙏")
})

