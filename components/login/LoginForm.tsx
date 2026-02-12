"use client";
import { loginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import z from "zod";
import { useAuthStore } from "@/stores/auth";
import LoadingCircle from "../LoadingCircle";

const LoginForm = () => {
  const { user, fetchCurrentUser } = useAuthStore();
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

        await fetchCurrentUser();
        toast.success(data.message);
        router.push(user ? `/${user.role.toLowerCase()}/dashboard` : "/login");
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong!");
      }
    });
  };
  return (
    <div className="w-full max-w-md p-6">
      <div className="mb-6 space-y-1 text-center">
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
              className="w-fit text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              disabled={isPending}
              placeholder="Enter your email"
              className="w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm text-gray-800 shadow-sm outline-0 focus:ring-gray-800 focus:outline-2 focus:outline-gray-800 disabled:cursor-default disabled:opacity-50"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="grid gap-1">
            <label
              htmlFor="password"
              className="w-fit text-sm font-semibold text-gray-800"
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
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-800 shadow-sm outline-0 focus:ring-gray-800 focus:outline-2 focus:outline-gray-800 disabled:cursor-default disabled:opacity-50"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? "hide password" : "show password"}
                className="absolute top-1/2 right-0 -translate-y-1/2 cursor-pointer p-2"
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
          className="mx-auto flex cursor-pointer items-center gap-1 rounded-full bg-blue-500 px-8 py-2.5 text-center font-semibold text-white shadow-sm transition-all duration-300 hover:bg-blue-600 focus:bg-blue-600 disabled:cursor-default disabled:opacity-50"
        >
          {isPending ? (
            <>
              <LoadingCircle className="size-4 border-white" /> Loading...
            </>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
