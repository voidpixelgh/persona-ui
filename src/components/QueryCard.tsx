import React from "react";
import { useMutation } from "react-query";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@material-tailwind/react";
import DatePicker from "react-datepicker";
import { useResponse } from "../utils/ResponseContext";
import { postFormData } from "../utils/queries";
import "react-datepicker/dist/react-datepicker.css";

function QueryCard() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { setResponse } = useResponse();

  const mutation = useMutation(postFormData, {
    onSuccess: (data) => {
      // Handle success
      setResponse(data);
    },
    onError: (error) => {
      // Handle error
      console.error(error);
    },
  });

  const onSubmit = (data: {}) => {
    mutation.mutate(data);
  };

  return (
    <div className="max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center space-x-4 py-5 justify-center"
      >
        {/* Location Input */}
        <div className="flex flex-col w-1/3">
          <label
            htmlFor="query"
            className="block text-sm font-medium text-gray-700 mb-1 text-left"
          >
            Try to find something about your persona
          </label>
          <Controller
            name="query"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                {...register("query", { required: true })}
                type="text"
                color="indigo"
                size="md"
                variant="outlined"
                /* outline={true} */
                placeholder="query"
              />
            )}
          />
          {errors.query && (
            <span className="text-red-500 text-left">
              Query is required.
            </span>
          )}{" "}
          {/* Error Message */}
        </div>

        <div className="flex flex-col w-1/3">
          <label
            htmlFor="img"
            className="block text-sm font-medium text-gray-700 mb-1 text-left"
          >
            Insert the URL of the image
          </label>
          <Controller
            name="img"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                {...register("img")}
                type="text"
                color="indigo"
                size="md"
                variant="outlined"
                /* outline={true} */
                placeholder="img"
              />
            )}
          />
          {errors.img && (
            <span className="text-red-500 text-left">
              Query is required.
            </span>
          )}{" "}
          {/* Error Message */}
        </div>

        {/* Submit Button */}
        <div className="flex flex-col justify-center pt-4">
          {mutation.isLoading ? (
            <>Loading</>
          ) : (
            <button
              type="submit"
              className="btn bg-indigo-800 text-white rounded-md px-4 py-2 mt-2"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default QueryCard;
