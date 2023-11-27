"use client";
import { Input, PasswordInput } from "../inputs";
import { Button, CancelButton } from "../button";
import Link from "next/link";
import { errorToast, notify } from "@/lib/toasts";
import { useForm, Controller } from "react-hook-form";
import { FormDataSignIn } from "@/types";
import { signIn } from "@/lib/posts";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Spinner } from "../Spinner";
const backgroundSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="815"
    height="1024"
    viewBox="0 0 815 1024"
    fill="none"
    style={{
      position: "absolute",
      left: 0,
      top: 0,
      zIndex: -1,
    }}
  >
    <path
      opacity="0.7"
      d="M815 555.5C815 961.705 592.933 1291 319 1291C45.0668 1291 -177 961.705 -177 555.5C-177 149.295 45.0668 -180 319 -180C592.933 -180 815 149.295 815 555.5Z"
      fill="#FFFCB3"
    />
  </svg>
);

function Signin() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    setIsLoading(false);
  }, []);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormDataSignIn>({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const registerUser = async (data: { username: string; password: string }) => {
    try {
      if (data.username && data.password) {
        setIsLoading(true);
        const response: any = await signIn(data);
        Cookies.set("authToken", JSON.stringify(response.data[0].token));
        router.push("/pages/user/dashboard");
      } else notify("Please fill all fields");
    } catch (error: any) {
      errorToast(error);
    } finally {
      reset();
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };
  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="relative flex h-screen items-center justify-center overflow-hidden">
          {backgroundSvg}
          <div
            className="rounded-lg p-8 max-w-md w-full bg-white shadow-md"
            style={{ borderRadius: "10px", opacity: 0.8 }}
          >
            <h1 className="text-center login-heading">SIGN IN</h1>
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
                <Link
                  href="/pages/auth/signup"
                  className="text-blue-500 hover:text-blue-700 underline  no-underline"
                >
                  Create account
                </Link>
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
      )}
    </div>
  );
}

export default Signin;
