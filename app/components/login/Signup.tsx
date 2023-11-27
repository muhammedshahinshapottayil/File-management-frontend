"use client";
import { Input, PasswordInput } from "../inputs";
import { Button, CancelButton } from "../button";
import { useForm, Controller, FieldError } from "react-hook-form";
import Link from "next/link";
import { FormDataSignup } from "@/types";
import { signUp } from "@/lib/posts";
import { errorToast, notify } from "@/lib/toasts";
import { useEffect, useState } from "react";
import { Spinner } from "../Spinner";
import { useRouter } from "next/navigation";

const ErrorHandler = ({
  nativeData,
  dependentData,
  nativeErr,
  dependentErr,
}: {
  nativeData: string;
  dependentData: string;
  nativeErr?: FieldError;
  dependentErr?: FieldError;
}) => {
  return (
    <p className="text-red-600 text-sm font-medium">
      {nativeData &&
        dependentData &&
        !nativeErr &&
        !dependentErr &&
        nativeData !== dependentData &&
        "Password and Confirm Password do not match"}
    </p>
  );
};

export default function Signup() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();
  useEffect(() => {
    setIsLoading(false);
  }, []);

  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormDataSignup>({
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const registerUser = async (data: {
    username: string;
    password: string;
    confirmPassword: string;
  }) => {
    try {
      if (data.username && data.password && data.confirmPassword) {
        setIsLoading(true);
        await signUp(data);
        notify("Successfully Completed");
        router.push("/pages/auth/login");
      } else notify("Please fill all fields");
      reset();
    } catch (error: any) {
      errorToast(error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      reset();
    }
  };

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="relative flex h-screen items-center justify-center background-circle-svg ">
          <div className="w-full max-w-2xl flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 text-white rounded-l-lg flex flex-col items-center justify-center green-bg-color p-4 left">
              <h1 className="text-4xl font-roboto font-semibold text-shadow-md mb-4 text-center">
                Welcome Back
              </h1>
              <p className="text-white font-roboto text-base font-normal leading-normal text-center">
                To keep connected with us, please login with your personal info.
              </p>
              <Link
                href="/pages/auth/login"
                className="rounded-lg border border-white shadow-xl mt-3 py-2 px-4"
              >
                Sign In
              </Link>
            </div>

            <div
              className="w-full md:w-3/4 rounded-r-lg p-8 bg-white shadow-md mt-4 md:mt-0"
              style={{ borderRadius: "10px", opacity: 0.8 }}
            >
              <h1 className="text-center login-heading">CREATE ACCOUNT</h1>
              <form className="mt-4" onSubmit={handleSubmit(registerUser)}>
                <div className="mb-4">
                  <Controller
                    name="username"
                    control={control}
                    rules={{
                      required: true,
                      pattern: {
                        value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi,
                        message: "Invalid Email Address",
                      },
                    }}
                    render={({ field }) => {
                      return (
                        <div>
                          <Input
                            required={true}
                            placeholder="Username"
                            {...field}
                          />
                          {errors.username && (
                            <p className="text-red-600 text-sm font-medium">
                              {errors.username.message}
                            </p>
                          )}
                        </div>
                      );
                    }}
                  />
                </div>
                <div className="mb-4">
                  <Controller
                    name="password"
                    control={control}
                    rules={{
                      required: true,
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/gi,
                        message:
                          "At least 8 characters, at least one uppercase letter, one lowercase letter, one digit, and one special character in this [@$!%*?&#]",
                      },
                    }}
                    render={({ field }) => {
                      return (
                        <div>
                          <PasswordInput
                            required={true}
                            placeholder="Password"
                            {...field}
                          />
                          {errors.password && (
                            <p className="text-red-600 text-sm font-medium">
                              {errors.password.message}
                            </p>
                          )}
                        </div>
                      );
                    }}
                  />
                </div>
                <div className="mb-4">
                  <Controller
                    name="confirmPassword"
                    control={control}
                    rules={{
                      required: true,
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/gi,
                        message:
                          "At least 8 characters, at least one uppercase letter, one lowercase letter, one digit, and one special character in this [@$!%*?&#]",
                      },
                    }}
                    render={({ field }) => {
                      return (
                        <div>
                          <PasswordInput
                            required={true}
                            placeholder="Confirm Password"
                            {...field}
                          />
                          {errors.confirmPassword && (
                            <p className="text-red-600 text-sm font-medium">
                              {errors.confirmPassword.message}
                            </p>
                          )}
                          <ErrorHandler
                            nativeData={confirmPassword}
                            nativeErr={errors.confirmPassword}
                            dependentData={password}
                            dependentErr={errors.password}
                          />
                        </div>
                      );
                    }}
                  />
                  <Link
                    href="/pages/auth/login"
                    className="text-blue-500 hover:text-blue-700 underline float-right login-link"
                  >
                    Already an account holder ?
                  </Link>{" "}
                </div>
                <div className="flex justify-evenly">
                  <Button type="submit">Submit</Button>
                  <CancelButton
                    type="reset"
                    onClick={() => {
                      reset();
                    }}
                  >
                    Cancel
                  </CancelButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
