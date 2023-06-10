import * as yup from 'yup'

export const schema = yup.object().shape({
  title: yup.string().required("Provide a title to your NFT"),
  isPrice: yup.boolean(),
  isMinBid: yup.boolean(),
  price: yup.number().when("isPrice", {
    is: true,
    then: () => yup.number()
      .min(1, "Price must be greater than zero").required("Price cannot be empty")
  }),
  minBid: yup.number().when("isMinBid", {
    is: true,
    then: () => yup.number()
      .min(1, "Price must be greater than zero").required("Min bid cannot be empty")
  }),
  description: yup.string().required("Provide a description of you NFT"),
  royalties: yup.number().min(1, "Royalties cannot be null").max(100, "Item cannot exceed 100%").required("You need to state how much royalties you will collect"),
  collections: yup.string().required("Choose a category")

});
