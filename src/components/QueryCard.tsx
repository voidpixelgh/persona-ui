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
    console.log(data);

    let query = {
        birthplace: data.birthplace,
        dateOfBirth: data.dateOfBirth.toLocaleString('en-US')
    }

    console.log(query);
    mutation.mutate(query);
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
            htmlFor="birthplace"
            className="block text-sm font-medium text-gray-700 mb-1 text-left"
          >
            Birthplace
          </label>
          <Controller
            name="birthplace"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input
                {...register("birthplace", { required: true })}
                type="text"
                color="indigo"
                size="md"
                variant="outlined"
                /* outline={true} */
                placeholder="Birthplace"
              />
            )}
          />
          {errors.birthplace && (
            <span className="text-red-500 text-left">
              Birthplace is required.
            </span>
          )}{" "}
          {/* Error Message */}
        </div>

        {/* Date and Time Picker */}
        <div className="flex flex-col">
          <label
            htmlFor="dateOfBirth"
            className="block text-sm font-medium text-gray-700 mb-1 text-left"
          >
            Date of Birth
          </label>
          <Controller
            control={control}
            name="dateOfBirth"
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value, name, ref } }) => (
              <DatePicker
                onChange={onChange}
                onBlur={onBlur}
                selected={value}
                showTimeSelect
                dateFormat="Pp"
                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                ref={ref}
                placeholderText="MM/DD/YYYY"
              />
            )}
          />
          {errors.dateOfBirth && (
            <span className="text-red-500 text-left">
              Date of birth is required.
            </span>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex flex-col justify-center pt-4">
          {mutation.isLoading ? (
            <>Loading</>
          ) : (
            <button
              type="submit"
              className="btn bg-green-900 text-white rounded-md px-4 py-2 mt-2"
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
