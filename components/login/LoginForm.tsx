"use client";
import { loginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import z from "zod";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    startTransition(async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          },
        );
        const data = await res.json();

        if (!res.ok) {
          toast.error(data.message);
          resetField("password");
          return;
        }

        toast.success(data.message);
        router.push("/");
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong!");
      }
    });
  };
  return (
    <div className="w-full max-w-md p-6">
      <div className="space-y-1 text-center mb-6">
        <h1 className="text-2xl font-semibold">Login</h1>
        <p className="text-sm text-gray-600">
          Enter your credentials to access the platform.
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-6">
          <div className="grid gap-1">
            <label
              htmlFor="email"
              className="font-semibold text-gray-800 text-sm w-fit"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              disabled={isPending}
              placeholder="Enter your email"
              className="border border-gray-300 w-full disabled:opacity-50 disabled:cursor-default rounded-md shadow-sm text-sm py-2.5 text-gray-800 px-3 focus:ring-gray-800 focus:outline-gray-800 focus:outline-2 outline-0"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="grid gap-1">
            <label
              htmlFor="password"
              className="font-semibold text-gray-800 text-sm w-fit"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                {...register("password")}
                disabled={isPending}
                placeholder="Enter your password"
                className="border border-gray-300 w-full disabled:opacity-50 disabled:cursor-default rounded-md shadow-sm text-gray-800 text-sm py-2 px-3 focus:ring-gray-800 focus:outline-gray-800 focus:outline-2 outline-0"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? "hide password" : "show password"}
                className="absolute top-1/2 -translate-y-1/2 right-0 cursor-pointer p-2"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="font-semibold bg-blue-500 disabled:opacity-50 disabled:cursor-default text-center px-8 py-2.5 rounded-full flex mx-auto shadow-sm text-white hover:bg-blue-600 transition-all cursor-pointer duration-300 focus:bg-blue-600"
        >
          {isPending ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
