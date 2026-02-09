"use client";
import Link from "next/link";
import TeacherTable from "./TeacherTable";
import Pagination from "@/components/Pagination";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";
import { useSearchParams } from "next/navigation";
import { TeacherResponse } from "@/types";
import { useState } from "react";

const TeacherView = () => {
  const [sort, setSort] = useState({ sortBy: "createdAt", order: "asc" });
  const params = useSearchParams();

  const page = parseInt(params.get("page") || "1");
  const limit = "10";

  const query = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...sort,
  });
  const {
    data: response,
    isLoading,
    mutate,
  } = useSWR<TeacherResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/teacher?${query}`,
    fetcher,
  );

  const teachers = response ? response.data : [];
  return (
    <section className="py-3 md:py-8 dark:bg-gray-900">
      <div className="px-[2%]">
        <Link
          href="teachers/add"
          className="mb-6 ml-auto flex w-fit cursor-pointer items-center justify-center rounded-lg bg-blue-500 px-4 py-2 text-sm text-white transition-all duration-300 hover:bg-blue-500/80"
        >
          Tambah Guru
        </Link>
        <div className="relative overflow-hidden bg-white shadow-md sm:rounded-lg dark:bg-gray-800">
          <TeacherTable
            teachers={teachers}
            isLoading={isLoading}
            sort={sort}
            setSort={setSort}
            mutate={mutate}
          />
          <Pagination
            currentPage={response ? response.page : 1}
            totalPages={response ? response.totalPages : 1}
            totalData={response ? response.total : 0}
            limitData={response ? response.limit : 10}
          />
        </div>
      </div>
    </section>
  );
};

export default TeacherView;
