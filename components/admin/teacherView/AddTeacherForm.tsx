"use client";
import LoadingCircle from "@/components/LoadingCircle";
import { fetcher } from "@/lib/fetcher";
import { addTeacherSchema } from "@/schemas";
import { SubjectResponse } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import useSWR from "swr";
import z from "zod";

const AddTeacherForm = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const { data: response, isLoading } = useSWR<SubjectResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/subject`,
    fetcher,
  );

  const subjects = response ? response.data : [];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof addTeacherSchema>>({
    resolver: zodResolver(addTeacherSchema),
    defaultValues: {
      name: "",
      email: "",
      nip: "",
      phone: "",
      subjectId: "",
    },
  });

  const onSubmit = (values: z.infer<typeof addTeacherSchema>) => {
    startTransition(async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/teacher`, {
          method: "POST",
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        const data = await res.json();

        if (!res.ok) {
          toast.error(data.message);
          return;
        }

        toast.success(data.message);
        router.push("/admin/teachers");
      } catch (error) {
        console.log(error);
        toast.error("Terjadi kesalahan!");
      }
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="space-y-4">
        <div className="grid gap-1">
          <label
            htmlFor="name"
            className="w-fit text-sm font-medium text-gray-800"
          >
            Nama <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            disabled={isPending}
            {...register("name")}
            placeholder="Masukkan nama lengkap"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 transition outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>
        <div className="grid gap-1">
          <label
            htmlFor="email"
            className="w-fit text-sm font-medium text-gray-800"
          >
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            disabled={isPending}
            {...register("email")}
            placeholder="johndoe@email.com"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 transition outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="grid gap-1">
          <label
            htmlFor="nip"
            className="w-fit text-sm font-medium text-gray-800"
          >
            NIP <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="nip"
            disabled={isPending}
            {...register("nip")}
            onChange={(e) => {
              e.target.value = e.target.value.replace(/\D/g, "");
            }}
            placeholder="Nomor induk pegawai"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 transition outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          />
          {errors.nip && (
            <p className="text-sm text-red-500">{errors.nip.message}</p>
          )}
        </div>
        <div className="grid gap-1">
          <label
            htmlFor="phone"
            className="w-fit text-sm font-medium text-gray-800"
          >
            Nomor Telepon <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="phone"
            disabled={isPending}
            {...register("phone")}
            onChange={(e) => {
              e.target.value = e.target.value.replace(/\D/g, "");
            }}
            placeholder="08xx-xxxx-xxxx"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 transition outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          />
          {errors.phone && (
            <p className="text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>
        <div className="grid gap-1">
          <label
            htmlFor="subject"
            className="w-fit text-sm font-medium text-gray-800"
          >
            Mata Pelajaran <span className="text-red-500">*</span>
          </label>
          <select
            id="subject"
            disabled={isPending}
            {...register("subjectId")}
            className="w-full cursor-pointer rounded-lg border border-gray-300 px-4 py-2 transition outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            <option value="">Pilih Mata Pelajaran</option>
            {subjects.length === 0 && isLoading ? (
              <option
                value=""
                disabled
                className="flex items-center justify-center gap-2"
              >
                Memuat data...
              </option>
            ) : subjects.length > 0 && !isLoading ? (
              subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))
            ) : (
              <option value="" disabled>
                Tidak ada pilihan!
              </option>
            )}
          </select>
          {errors.subjectId && (
            <p className="text-sm text-red-500">{errors.subjectId.message}</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white transition duration-300 hover:bg-blue-700 disabled:cursor-default disabled:opacity-50"
        >
          {isPending ? (
            <>
              <LoadingCircle className="size-5 border-white" /> Loading...
            </>
          ) : (
            "Simpan"
          )}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/teachers")}
          disabled={isPending}
          className="flex-1 cursor-pointer rounded-lg bg-gray-200 px-4 py-2.5 font-medium text-gray-700 transition duration-300 hover:bg-gray-300 disabled:opacity-50"
        >
          Batal
        </button>
      </div>
    </form>
  );
};

export default AddTeacherForm;
