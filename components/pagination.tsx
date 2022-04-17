
const Pagination = (props: {
  totalMovies: number
  postPerPage: number
  currentPage: number
  handleNextPage: any
  nextOffset: number
  handlePreviousPage: any
}) => {
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between">
        <button
          disabled={props.currentPage === 1}
          onClick={props.handlePreviousPage}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </button>

        {props.nextOffset <= props.totalMovies && (
          <button
            onClick={props.handleNextPage}
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Next
          </button>
        )}
      </div>
    </div>
  )
}

export default Pagination
