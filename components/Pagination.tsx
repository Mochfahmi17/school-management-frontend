"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  totalData: number;
  limitData: number;
};

const Pagination = ({
  currentPage,
  totalPages,
  totalData,
  limitData,
}: PaginationProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const startIndex = (currentPage - 1) * limitData + 1;
  const endIndex = Math.min(currentPage * limitData, totalData);

  const handlePageChange = (nextPage: number) => {
    if (nextPage < 1 || nextPage > totalPages) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", nextPage.toString());

    if (nextPage === 1) {
      params.delete("page");
    }

    router.push(`?${params.toString()}`);
  };

  const getPageList = (): (string | number)[] => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage < 3) {
      return [1, 2, 3, "...", totalPages];
    }

    if (currentPage > totalPages - 2) {
      return [1, "...", totalPages - 2, totalPages - 1, totalPages];
    }

    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  const pageList = getPageList();

  return (
    <nav
      aria-label="Pagination"
      className="flex flex-col gap-3 p-4 md:flex-row md:items-center md:justify-between"
    >
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Showing{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {startIndex} – {endIndex}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {totalData}
        </span>
      </p>

      <ul className="inline-flex items-stretch -space-x-px">
        <li>
          <button
            type="button"
            aria-label="Previous page"
            onClick={() => handlePageChange(Number(currentPage - 1))}
            disabled={currentPage === 1}
            className="flex cursor-pointer items-center justify-center rounded-l-lg border border-gray-300 bg-white px-4 py-3 text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:cursor-default disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <FaChevronLeft className="size-3" />
          </button>
        </li>

        {pageList.map((pageItem, i) => {
          if (pageItem === "...") {
            return (
              <li key={`ellipsis-${i}`}>
                <button
                  type="button"
                  disabled
                  className="border border-gray-300 bg-white px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  ...
                </button>
              </li>
            );
          }

          return (
            <li key={`page-${pageItem}`}>
              <button
                type="button"
                onClick={() => handlePageChange(Number(pageItem))}
                className={`border ${currentPage === pageItem ? "border-blue-300 bg-blue-50 text-blue-600" : "cursor-pointer border-gray-300 bg-white text-gray-500 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"} px-3 py-2 text-sm`}
              >
                {pageItem}
              </button>
            </li>
          );
        })}

        <li>
          <button
            type="button"
            aria-label="Next page"
            onClick={() => handlePageChange(Number(currentPage + 1))}
            disabled={currentPage === totalPages}
            className="flex cursor-pointer items-center justify-center rounded-r-lg border border-gray-300 bg-white px-4 py-3 text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:cursor-default disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <FaChevronRight className="size-3" />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
