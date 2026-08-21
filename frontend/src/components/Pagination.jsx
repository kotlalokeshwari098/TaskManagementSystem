function Pagination({
    currentPage,
    totalPages,
    onPageChange
}) {

    // Don't show pagination
    // if there is only one page.
    if (totalPages <= 1) {
        return null;
    }


    return (

        <div className="
            mt-4
            flex
            flex-col
            gap-3
            rounded-xl
            border
            border-slate-200
            dark:border-slate-800
            bg-white
            dark:bg-slate-800
            px-4
            py-4
            shadow-sm
            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:px-6
            transition-colors duration-200
        ">


            {/* PAGE INFORMATION */}

            <p className="text-sm text-slate-500 dark:text-slate-400">

                Page{" "}
                <span className="font-medium text-slate-700 dark:text-slate-200">
                    {currentPage}
                </span>

                {" "}of{" "}

                <span className="font-medium text-slate-700 dark:text-slate-200">
                    {totalPages}
                </span>

            </p>



            {/* PAGINATION BUTTONS */}

            <div className="flex items-center gap-1">


                {/* PREVIOUS */}

                <button
                    type="button"
                    onClick={() =>
                        onPageChange(
                            currentPage - 1
                        )
                    }
                    disabled={currentPage === 1}
                    className="
                        rounded-lg
                        border
                        border-slate-200
                        dark:border-slate-700
                        px-3
                        py-1.5
                        text-sm
                        font-medium
                        text-slate-700
                        dark:text-slate-200
                        transition
                        hover:bg-slate-100
                        dark:hover:bg-slate-700
                        disabled:cursor-not-allowed
                        disabled:opacity-40
                        cursor-pointer
                    "
                >

                    ←

                </button>



                {/* PAGE NUMBERS */}

                {Array.from(
                    {
                        length: totalPages
                    },
                    (_, index) => index + 1
                ).map((pageNumber) => (

                    <button
                        key={pageNumber}
                        type="button"
                        onClick={() =>
                            onPageChange(
                                pageNumber
                            )
                        }
                        className={`
                            min-w-9
                            rounded-lg
                            px-3
                            py-1.5
                            text-sm
                            font-medium
                            transition
                            cursor-pointer

                            ${
                                currentPage === pageNumber
                                    ? "bg-slate-900 dark:bg-indigo-600 text-white"
                                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                            }
                        `}
                    >

                        {pageNumber}

                    </button>

                ))}



                {/* NEXT */}

                <button
                    type="button"
                    onClick={() =>
                        onPageChange(
                            currentPage + 1
                        )
                    }
                    disabled={
                        currentPage === totalPages
                    }
                    className="
                        rounded-lg
                        border
                        border-slate-200
                        dark:border-slate-700
                        px-3
                        py-1.5
                        text-sm
                        font-medium
                        text-slate-700
                        dark:text-slate-200
                        transition
                        hover:bg-slate-100
                        dark:hover:bg-slate-700
                        disabled:cursor-not-allowed
                        disabled:opacity-40
                        cursor-pointer
                    "
                >

                    →

                </button>

            </div>

        </div>

    );
}


export default Pagination;