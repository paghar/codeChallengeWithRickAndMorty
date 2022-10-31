import { useCallback } from "react";

export interface INavigationProps {
  pages: string;
  page: number;
  loadPage: (index: number) => void;
}

const Navigation = ({pages, page, loadPage}: INavigationProps) => {
  const renderPageNumber = useCallback(() => {
    const pageCompontents = [];
    const startIndex: number = (page - 5) < 1 ? 1 : page - 5;
    const endIndex: number = (page + 5) > parseInt(pages, 10) ? parseInt(pages, 10) : page + 5;
    
    for (let index = startIndex; index < endIndex+1; index++) {
      
      pageCompontents.push(
        <>
          <a 
            className={`relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 ${index === 1 && page === 1 ? "rounded-l-md" : ""}${index === parseInt(pages, 10) && page === parseInt(pages, 10)}`}
            onClick={() => loadPage(index)}
            key={`page-number_${index}`}
          >
            {index}
          </a>
        </>
      )
      /* <a href="#" aria-current="page" className="relative z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 focus:z-20">1</a>*/
    }
    return pageCompontents;
  }, [page, pages, loadPage]);

  const renderPreviousButton = useCallback(() => {
    if(page > 1) {
      return (
        <a
          className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
          onClick={() => loadPage((page - 1))}
          aria-label="previous"
          key={`page-number_0`}
        >
          <span className="sr-only">Previous</span>
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
          </svg>
        </a>
      );
    }
  }, [page, loadPage])

  const renderNextButton = useCallback(() => {
    if(page < parseInt(pages, 10)) {
      return (
        <a
          className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
          onClick={() => loadPage((page + 1))}
          aria-label="next"
          key={`page-number_${(pages + 1)}`}
        >
          <span className="sr-only">Next</span>
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
          </svg>
        </a>
      );
    }
  }, [page, pages, loadPage])
  
  return(
    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination" key="navigation">
      {renderPreviousButton()}
      {renderPageNumber()}
      {renderNextButton()}
    </nav>
  )
};

export default Navigation;