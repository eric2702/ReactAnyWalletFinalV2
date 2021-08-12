import React from "react";

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  if (pageNumbers.length > 1) {
    return (
      <nav>
        <ul className="pagination justify-content-center mb-5 pb-2">
          <li key={1} className="page-item" style={{cursor:"pointer"}}>
            <a onClick={() => paginate(1)} className="page-link">
              &#60;&#60;
            </a>
          </li>
          {pageNumbers.map((number) => (
            <li key={number} className="page-item" style={{cursor:"pointer"}}>
              <a onClick={() => paginate(number)} className="page-link">
                {number}
              </a>
            </li>
          ))}
          <li key={pageNumbers.length} className="page-item" style={{cursor:"pointer"}}>
            <a
              onClick={() => paginate(pageNumbers.length)}
              className="page-link"
            >
              &#62;&#62;
            </a>
          </li>
        </ul>
      </nav>
    );
  } else {
    return "";
  }
};

export default Pagination;
