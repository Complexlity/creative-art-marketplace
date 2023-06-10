import * as yup from 'yup'

export const schema = yup.object().shape({
  title: yup.string().required("Provide a title to your NFT"),
  price: yup.number().min(1),
  description: yup.string().required("Provide a description of you NFT"),
  royalties: yup.number().min(1, "Royalties cannot be null").max(100, "Item cannot exceed 100%").required("You need to state how much royalties you will collect"),
  collections: yup.string().test("accepted", "Choose a valid category", function (value) {
    return value && value !== 'SEL'
  })

});
