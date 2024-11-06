import { DefaultButton, Stack } from "@fluentui/react";
import { Text } from "@fluentui/react-components";
import React, { useState } from "react";

const Pagination = ({ totalPages, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  // Function next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      onPageChange(currentPage + 1);
    }
  };

  // Function previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      onPageChange(currentPage - 1);
    }
  };

  return (
    <Stack horizontal tokens={{ childrenGap: 10 }} verticalAlign="center">
      <DefaultButton
        text="Previous"
        onClick={prevPage}
        disabled={currentPage === 1}
      />
      <Text variant="large">{`Page ${currentPage} of ${totalPages}`}</Text>
      <DefaultButton
        text="Next"
        onClick={nextPage}
        disabled={currentPage === totalPages}
      />
    </Stack>
  );
};

export default Pagination;
