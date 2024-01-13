import * as yup from 'yup'

type equalitySymbol = "startDate" | "endDate"

function verifyDate(date: string, applied = "startDate", diff = 0) {
  const checkedDate = new Date(date)
  checkedDate.setHours(0, 0, 0, 0)
  const currentDate = new Date()
  currentDate.setDate(currentDate.getDate() + diff)
  currentDate.setHours(0, 0, 0, 0)

  console.log(checkedDate, currentDate)

  let result

  switch (applied) {
    case 'startDate':
      result = checkedDate.getTime() >= currentDate.getTime()
    case 'endDate':
      result = checkedDate.getTime() >= (currentDate.getTime() + diff)
    default:
      result = checkedDate.getTime() == currentDate.getTime()
  }
}

export const schema = yup.object().shape({
  title: yup.string().required("Provide a title to your NFT"),
  isPrice: yup.boolean(),
  isMinBid: yup.boolean(),
  price: yup.number().when("isPrice", {
    is: true,
    then: () =>
      yup.number().moreThan(0, "Number must be greater than zero").nullable().required("Price cannot be empty"),
  }),
  minBid: yup.number().when("isMinBid", {
    is: true,
    then: () =>
      yup
        .number()
        .moreThan(0, "Number must be greater than zero")
        .nullable()
        .required("Minimum bid cannot be empty"),
  }),
  startDate: yup.date().when("isCheckingDate", {
  is: true,
  then: () => {
    let start = new Date();
    start.setDate(start.getDate() - 1);

    let end = new Date();
    end.setDate(end.getDate() + 29);
    return yup
      .date()
      .min(start, "Start date cannot be in the past")
      .max(end, "Start Date must be at most 30 days from now")
      .required("Start date cannot be empty");
  },
}),
  endDate: yup.date().when("isCheckingDate", {
  is: true,
    then: () => {
    // End date must be at least one day from start date
    let start = new Date();
    start.setDate(start.getDate() - 2);

    // End date must not exceed 30 days from now
      let end = new Date();
    end.setDate(end.getDate() + 30);

    return yup
      .date()
      .min(start, "End date must be at least 1 days from now")
      .max(end, "End date must not exceed 30 days")
      .required("End date cannot be empty");
  },
}),
  description: yup.string().required("Provide a description of you NFT"),
  royalties: yup
    .number()
    .required("Provide a number (must be integer greater between 0 and 70")
  .moreThan(0, "Number must be greater than zero")
    .nullable()
    .max(70, "Item cannot exceed 70%"),

  collections: yup.string().required("Choose a category"),
});


export const bidSchema = yup.object().shape({
  bid: yup.number()
  .required("Please provide a number")
  .moreThan(0, "Number must be greater than zero")
    .nullable(),
    termsAndConditions: yup
    .bool()
    .oneOf([true], 'You need to accept the terms and conditions'),
})

