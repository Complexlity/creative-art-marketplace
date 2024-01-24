import * as yup from "yup";

function verifyDates(startDate: string, endDate: string) {
  const checkedStartDate = new Date(startDate);
  checkedStartDate.setHours(0, 0, 0, 0);
  const checkedEndDate = new Date(endDate);
  checkedEndDate.setDate(checkedEndDate.getDate());
  checkedEndDate.setHours(0, 0, 0, 0);

  return checkedEndDate.getTime() > checkedStartDate.getTime();
}

// Start date must be tomorrow
const START_DATE_DIFFERENCE = 0;
// End Date must not exceed 30 days from now
const END_DATE_DIFFERENCE = 30;

export const schema = yup
  .object()
  .shape({
    title: yup.string().required("Provide a title to your NFT"),
    isPrice: yup.boolean(),
    isMinBid: yup.boolean(),
    price: yup.number().when("isPrice", {
      is: true,
      then: () =>
        yup
          .number()
          .moreThan(0, "Price must be greater than zero")
          .nullable()
          .required("Price cannot be empty"),
    }),
    minBid: yup.number().when("isMinBid", {
      is: true,
      then: () =>
        yup
          .number()
          .moreThan(0, "Minimum bid must be greater than zero")
          .nullable()
          .required("Minimum bid cannot be empty"),
    }),
    startDate: yup.date().when("isCheckingDate", {
      is: true,
      then: () => {
        let start = new Date();
        start.setDate(start.getDate() + START_DATE_DIFFERENCE);

        let end = new Date();
        end.setDate(end.getDate() + END_DATE_DIFFERENCE);
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
        start.setDate(start.getDate() - (START_DATE_DIFFERENCE + 1));

        // End date must not exceed 30 days from now
        let end = new Date();
        end.setDate(end.getDate() + (END_DATE_DIFFERENCE + 1));

        return yup
          .date()
          .min(start, "End date must be at least 2 days from now")
          .max(end, "End date must not exceed 31 days from now")
          .required("End date cannot be empty");
      },
    }),

    description: yup.string().required("Provide a description of you NFT"),
    royalties: yup
      .number()
      .required("Provide a number (must be integer greater between 0 and 70")
      .moreThan(0, "Royalties must be greater than zero")
      .nullable()
      .max(70, "Item cannot exceed 70%"),

    collections: yup
      .string()
      .required("Choose a category")
      .notOneOf(["SEL"], "Choose a category"),
  })
  .test({
    name: "endDateChecker",
    test: function (values) {
      let start = values.startDate;
      let end = values.endDate;
      if (!start || !end) return;
      const isDatesValid = verifyDates(
        start as unknown as string,
        end as unknown as string
      );

      if (!isDatesValid) {
        return this.createError({
          path: "endDate",
          message: "End date must be greater than Start date",
        });
      }

      return true;
    },
  });

export const bidSchema = yup.object().shape({
  bid: yup
    .number()
    .required("Please provide a number")
    .moreThan(0, "Number must be greater than zero")
    .nullable(),
  termsAndConditions: yup
    .bool()
    .oneOf([true], "You need to accept the terms and conditions"),
});

export const subscribeSchema = yup.object().shape({
  email: yup.string().email().required("Please provide a valid email"),
});
